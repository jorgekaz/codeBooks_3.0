import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/core/api-service/product.service';
import { Book, User } from 'src/app/core/Modelos';
import { CommonService } from 'src/app/core/api-service/common.services';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/core/api-service/auth.service';


@Component({
  selector: 'app-confirma-compra',
  templateUrl: './confirma-compra.component.html',
  styleUrls: ['./confirma-compra.component.css']
})
export class ConfirmaCompraComponent implements OnInit {

    carrito: Book[] = [];
    user: User = new User();

    firstFormGroup: FormGroup;

    secondFormGroup: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogRef: MatDialogRef<ConfirmaCompraComponent>,
                private productService: ProductService,
                private snackBar: MatSnackBar,
                private commonService: CommonService,
                private authService: AuthService,
                private formEdit: FormBuilder)
            {
                this.firstFormGroup = this.formEdit.group({
                  nombre: ['', [Validators.required]],
                });

                this.secondFormGroup = this.formEdit.group({
                  direccion: ['', [Validators.required]],
                });
            }

    ngOnInit(): void {
      this.carrito = this.data;
      this.user = this.authService.getUser();
      this.firstFormGroup.setValue({
        ['nombre']: this.user.nombre + " " + this.user.apellido
      })
      this.secondFormGroup.setValue({
        ['direccion']: this.user.direccion
      })
    }

    public confirmarVenta(){


      if(this.commonService.isLogued()){
        //this.message = "Compra realizada con exito";
        const idUsuario = this.authService.getUser().id;
        // persistir carrito
        // Pasar a otro array los id de los libros
        const idBooks: number[] = this.carrito.map(book => book.id != null ? book.id : 0);
        // Sumar el precio de todos los libros
        const costoTotal: number = this.carrito.reduce((sum, book) => sum + (book.precio != null ? book.precio : 0), 0);
        // Llamar al servicio para guardar el carrito
        this.productService.guardarCarrito(Number(idUsuario), idBooks, costoTotal).then(() => {
          // Mensaje ok
          this.snackBar.open("Compra realizada satisfactoriamente.", "",{
            duration: 3000
          });
          this.dialogRef.close(true);
        }).catch((error) => {
          this.snackBar.open("Ha ocurrido un error.", "",{
            duration: 2000
          });
        });

      }
    }

    public closeDialog(){
      this.dialogRef.close(false);
    }
}
