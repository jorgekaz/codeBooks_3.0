import { ProductService } from './../../../../core/api-service/product.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from 'src/app/core/Modelos';
import { HomeComponent } from '../../home.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmaCompraComponent } from '../confirma-compra/confirma-compra.component';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.css']
})
export class DetalleCompraComponent {

  @Input() cart: Book[] = [];
  @Input() costoTotal: number = 0;

  @Output() mensaje: EventEmitter<string>;

  constructor(private homeComponent: HomeComponent,
              private dialog: MatDialog){
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

  validateBuy(cart: Book[]){

    const dialogRef = this.dialog.open(ConfirmaCompraComponent, { data: cart, height: '500px', width: '700px' });
    console.log("SALIR");
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vaciar();
      }
    });
  }

  vaciar(){
    this.homeComponent.vaciar();
  }
}
