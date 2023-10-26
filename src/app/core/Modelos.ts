import { IBook, IUser } from "./Interfaces";

export class User implements IUser {
  id: number | null = null;
  username: string | null;
  password: string | null;

  constructor(username:string, password:string){
    this.username = username;
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

