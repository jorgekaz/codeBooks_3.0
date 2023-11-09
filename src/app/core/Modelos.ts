import { IBook, ICarrito, IUser } from "./Interfaces";

export class User implements IUser {
  id: number | null = null;
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';
  email: string = '';
  password: string = '';

  constructor(user?: any) {
    this.id = user == undefined ? '' : user.id;
    this.nombre = user == undefined ? '' : user.nombre;
    this.apellido = user == undefined ? '' : user.apellido;
    this.direccion = user == undefined ? '' : user.direccion;
    this.telefono = user == undefined ? '' : user.telefono;
    this.email = user == undefined ? '' : user.email;
    this.password = user == undefined ? '' : user.password;
  }

}

export class Book implements IBook{
  id: number | null;
  autor: string | null;
  pais: string | null;
  imagen: string | null;
  idioma: string | null;
  link: string | null;
  precio: number | null;
  titulo: string | null;
  year: number | null;

  constructor(id: number, autor: string, pais: string, imagen: string, idioma: string, link: string, precio: number, titulo: string, year: number) {
    this.id = id;
    this.autor = autor;
    this.pais = pais;
    this.imagen = imagen;
    this.idioma = idioma;
    this.link = link;
    this.precio = precio;
    this.titulo = titulo;
    this.year = year;
  }
}

export class Carrito implements ICarrito {
  idUsuario: number | null;
  idBooks: number[] | null;
  total: number | null;
  fechaCompra: string | null = null;

  constructor(idUsuario: number, idBooks: number[], total: number, fechaCompra: string) {
    this.idUsuario = idUsuario;
    this.idBooks = idBooks;
    this.total = total;
    this.fechaCompra = fechaCompra;
  }
}
