import { IBook, ICarrito, IUser } from "./Interfaces";

export class User implements IUser {
  nombre: string | null;
  apellido: string | null;
  direccion: string | null;
  telefono: string | null;
  email: string | null;
  password: string | null;

  constructor(nombre: string, apellido: string, direccion: string, telefono: string, email: string, password: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.direccion = direccion;
    this.telefono = telefono;
    this.email = email;
    this.password = password;
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
  fechaCompra: Date | null = null;

  constructor(idUsuario: number, idBooks: number[], total: number, fechaCompra: Date) {
    this.idUsuario = idUsuario;
    this.idBooks = idBooks;
    this.total = total;
    this.fechaCompra = fechaCompra;
  }
}