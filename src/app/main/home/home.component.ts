import { ProductService } from './../../core/api-service/product.service';
import { Component, OnInit } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Book } from '../../core/Modelos';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public books: Book[] = [];
  public cart: Book[] = [];

  itemsToBuy: boolean = false;
  logued: boolean = false;
  message: string = '';
  costoTotal: number = 0;
  cantidadLibros: number = 0;
  ultimaPagina: number = 0;
  inicio: number = 0;
  fin: number = 0;
  prevPage: boolean = false;
  nextPage: boolean = false;
  opcionElegida: string = "titulo";


  constructor(private productService: ProductService) {}

  ngOnInit(): void {
      this.buscarProductos();
      this.userLogued()
  }

  contarLibros(){
    this.cantidadLibros = this.books.length;
  }

  contarPaginas(){
    this.ultimaPagina = Math.ceil(this.books.length / 10);
  }

  recibirMensaje(mensaje:string){
    if (mensaje == "false")
      this.itemsToBuy = false;
  }

  showPrevPage(){
    this.nextPage = true;
    this.inicio = this.inicio - 10;
    this.fin = this.fin - 10;
    if (this.inicio <=0){
      this.inicio = 0;
      this.prevPage = false;
    }
  }

  showNextPage(){
    this.prevPage = true;
    this.inicio = this.inicio + 10;
    this.fin = this.fin + 10;
    if (this.fin >= this.books.length){
      this.fin = this.books.length;
      this.nextPage = false;
    }
  }

  buscarProductos(){
    this.productService.getProducts().then((data) => {
      this.books = data;
      this.contarLibros();
      this.contarPaginas();
      if (this.ultimaPagina > 1){
        this.nextPage = true;
        this.inicio = 0;
        this.fin = 10;
      }

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
      this.contarLibros();
      this.contarPaginas();
      if (this.ultimaPagina > 1){
        this.nextPage = true;
        this.inicio = 0;
        this.fin = 10;
      } else {
        this.nextPage = false;
        this.inicio = 0;
        this.fin = this.cantidadLibros;
      }
    })
  }

  drop(event: any) {
    this.itemsToBuy = false;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex + this.inicio,
                        event.currentIndex);
      this.costoTotal = 0;
      for (let book of this.cart) {
        this.costoTotal += book.precio != null ? book.precio : 0;
      }
    }
  }

  buy(){
    if(this.cart.length > 0){
      this.itemsToBuy = true;
      this.message = "Libros en el Carrito";

    }else{
      this.itemsToBuy = false;
    }
  }

  vaciar(){
    this.itemsToBuy = false;
    this.cart = [];
    this.buscarProductos();
    (<HTMLInputElement>document.getElementById("search")).value = "";

  }


  userLogued(): boolean{
    if (localStorage.getItem('accessToken')){
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      const token = localStorage.getItem('accessToken');
      if (id === token){
        this.logued = true;
        return true
      } else {
        localStorage.removeItem('accessToken');
      }
    }else {
      console.log("no logueado");
    }
    return false;
  }

  validateBuy(){
    if(this.userLogued()){
      this.message = "Compra realizada con exito";
      this.cart = [];
      this.costoTotal = 0;
    }
  }
}
