import { ProductService } from './../../core/api-service/product.service';
import { Component, OnInit } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Book } from '../../core/Modelos';
import 'hammerjs';
import { CommonService } from 'src/app/core/api-service/common.services';
import { MatSnackBar } from '@angular/material/snack-bar';




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

  userName: string | null = '';
  idUsuario: number | null = 0;



  constructor(private productService: ProductService, private commonService: CommonService, private snackBar: MatSnackBar) {}

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
    if (mensaje == "goHome")
      this.itemsToBuy = false;
    if (mensaje == "logout"){
      this.itemsToBuy = false;
      this.logued = false;
      this.userName = '';
      this.idUsuario = 0;
    }
    if (mensaje == "carritoVacio"){
      this.itemsToBuy = false;
      this.cart = [];
      this.costoTotal = 0;
    }
  }

  recibirLibrosFiltrados(libros: Book[]){
    this.books = libros;
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

  drop(event: any) {
    this.itemsToBuy = false;
    if (event.previousContainer === event.container) {
      // Arrastro y suelto en mismo contenedor
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Arrastro de un contenedor a otro
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





}
