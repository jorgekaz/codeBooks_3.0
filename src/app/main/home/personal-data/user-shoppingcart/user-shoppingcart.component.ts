import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Book, Carrito } from 'src/app/core/Modelos';
import { AuthService } from 'src/app/core/api-service/auth.service';
import { CommonService } from 'src/app/core/api-service/common.services';
import { ProductService } from 'src/app/core/api-service/product.service';
import { ShoppingcartService } from 'src/app/core/api-service/shoppingcart.service';


@Component({
  selector: 'app-user-shoppingcart',
  templateUrl: './user-shoppingcart.component.html',
  styleUrls: ['./user-shoppingcart.component.css']
})
export class UserShoppingcartComponent implements OnInit{

  logued: boolean = false;
  userName: string | null = '';
  idUsuario: number | null = 0;
  detalle: boolean = false;

  carritos: Carrito[] = [];
  books: Book[] = [];

  constructor(private commonService: CommonService,
              private router: Router,
              private cartService: ShoppingcartService,
              private bookService: ProductService,
              private snackBar: MatSnackBar,
              private authService: AuthService){}

  ngOnInit(): void {
    if (this.userLogued()){
      this.obtenerShoppingCartUsuario();
    } else {
      this.router.navigate(['/']);
    }
  }

  userLogued(): boolean{
    if (this.commonService.isLogued()){
      this.logued = true;
      this.userName = this.authService.getUser().nombre + " " + this.authService.getUser().apellido;
      this.idUsuario = this.authService.getUser().id;
      return true;
    } else {
      this.logued = false;
      this.snackBar.open("Por favor ingrese con su cuenta o registrese.", "", {
        duration: 2000
      });
    }
    return false;
  }

  obtenerShoppingCartUsuario(){
    const id: number = Number(this.idUsuario);
    this.cartService.getCartByUserId(id).then((data) =>{
      this.carritos = data;
    })
  }

  detalleCarrito(idLibros: number[]){
    this.detalle = true;
    this.books = [];
    idLibros.forEach(idLibro => {
      this.bookService.getProductById(idLibro).then((data) =>{
        this.books.push(data);
      })
    });
  }

  volver(){
    this.commonService.volverInicio();
  }
  ocultarDetalle(){
    this.detalle = false;
  }

}
