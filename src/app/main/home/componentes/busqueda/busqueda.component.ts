import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/core/Modelos';
import { ProductService } from 'src/app/core/api-service/product.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit{

    opcionElegida: string = 'titulo';
    hasFilteredResults: boolean = false;
    originalBooks: Book[] = [];

    @Output() booksFiltered: EventEmitter<Book[]>;
    @Input() books: Book[] = [];

    constructor(private productService: ProductService) {
      this.booksFiltered = new EventEmitter();
    }

  ngOnInit(): void {
    this.productService.getProducts().then((data) => {
      this.books = data;
      this.originalBooks = data;
    });
  }

    search(){
      let search = (<HTMLInputElement>document.getElementById("search")).value;
      this.productService.searchProducts(search).then((data) => {
        this.books = data.filter((book) => {
          if (this.opcionElegida == "titulo"){
            return book.titulo?.toLocaleLowerCase().includes(search.toLocaleLowerCase());
          }
          if (this.opcionElegida == "autor"){
            return book.autor?.toLocaleLowerCase().includes(search.toLocaleLowerCase());
          }
          if (this.opcionElegida == "pais"){
            return book.pais?.toLocaleLowerCase().includes(search.toLocaleLowerCase());
          }
          if (this.opcionElegida == "idioma"){
            return book.idioma?.toLocaleLowerCase().includes(search.toLocaleLowerCase());
          }
          return null;
        });
        this.booksFiltered.emit(this.books);
        this.hasFilteredResults = true;
      });
    }

    clearFilters() {
      this.books = this.originalBooks; // Restaura la lista original de libros
      this.booksFiltered.emit(this.books);
      this.hasFilteredResults = false; // Oculta el botón de limpieza
      (<HTMLInputElement>document.getElementById("search")).value = ''; // Limpia el campo de búsqueda
    }
}
