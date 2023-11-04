import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book, Carrito } from 'src/app/core/Modelos';
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

  constructor(private commonService: CommonService, private router: Router, private cartService: ShoppingcartService, private bookService: ProductService){}

  ngOnInit(): void {
    if (this.userLogued()){
      console.log("adentro entrando al perfil");
      this.obtenerShoppingCartUsuario();
    } else {
      this.router.navigateByUrl("/");
    }
  }

  userLogued(): boolean{
    if (this.commonService.userLogued()){
      this.logued = true;
      this.userName = localStorage.getItem('userName');
      this.idUsuario = Number(localStorage.getItem('idUsuario'));
      return true;
    } else {
      this.logued = false;
    }
    return false;
  }

  obtenerShoppingCartUsuario(){
    const id: number = Number(this.idUsuario);
    this.cartService.getCartByUserId(id).then((data) =>{
      console.log(data);
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
    console.log(this.books);
  }

  volver(){
    this.commonService.volverInicio();
  }
}