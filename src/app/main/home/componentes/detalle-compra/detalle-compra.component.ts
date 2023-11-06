import { ProductService } from './../../../../core/api-service/product.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from 'src/app/core/Modelos';
import { HomeComponent } from '../../home.component';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.css']
})
export class DetalleCompraComponent {

  @Input() message: string = '';
  @Input() cart: Book[] = [];
  @Input() costoTotal: number = 0;

  @Output() mensaje: EventEmitter<string>;

  constructor(private productService: ProductService, private snackBar: MatSnackBar, private homeComponent: HomeComponent){
    this.mensaje = new EventEmitter();
  }

  eliminarLibro(id: number | null){
    const libroaEliminar = this.cart.filter(book => book.id == id);
    if (libroaEliminar != null){
      const index = this.cart.indexOf(libroaEliminar[0]);
      this.cart.splice(index, 1);
      this.costoTotal -= libroaEliminar[0].precio != null ? libroaEliminar[0].precio : 0;
    }
    if (this.cart.length == 0){
      // Carrito Vacio
      this.mensaje.emit("carritoVacio");
    }
  }

  validateBuy(){
    if(this.homeComponent.userLogued()){
      this.message = "Compra realizada con exito";
      const idUsuario = localStorage.getItem('idUsuario');
      console.log(idUsuario);
      // persistir carrito
      // Pasar a otro array los id de los libros
      const idBooks: number[] = this.cart.map(book => book.id != null ? book.id : 0);
      this.productService.guardarCarrito(Number(idUsuario), idBooks, this.costoTotal).then((data) => {
        // Mensaje ok
        this.snackBar.open("Compra realizada satisfactoriamente.", "",{
          duration: 3000
        });
      }).catch((error) => {
        this.snackBar.open(error.error, "",{
          duration: 2000
        });
      });
      this.homeComponent.vaciar();
    }
  }

  vaciar(){
    this.homeComponent.vaciar();
  }
}
