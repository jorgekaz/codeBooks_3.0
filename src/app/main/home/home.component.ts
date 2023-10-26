import { ProductService } from './../../core/api-service/product.service';
import { Component, OnInit } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Book } from '../../core/Modelos';
import 'hammerjs';
import { CookieService } from 'ngx-cookie-service';



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

  constructor(private productService: ProductService, private cookies: CookieService) { }

  ngOnInit(): void {
      this.buscarProductos();
      this.userLogued();
  }

  recibirMensaje(mensaje:string){
    if (mensaje == "false")
      this.itemsToBuy = false;
  }

  buscarProductos(){
    this.productService.getProducts().then((data) => this.books = data);
  }

  drop(event: any) {
    this.itemsToBuy = false;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
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

  }

  userLogued(): boolean{
    if (this.cookies.check("X-Auth-Token")){
      console.log(this.cookies.get('X-Auth-Token'));
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      const token = this.cookies.get('X-Auth-Token');
      if (id === token){
        this.logued = true;
        return true
      }
    } else {

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
