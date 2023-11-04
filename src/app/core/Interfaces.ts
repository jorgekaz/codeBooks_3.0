import { Book } from "./Modelos";

export interface IUser{
  nombre: string | null;
  apellido: string | null;
  direccion: string | null;
  telefono: string | null;
  email: string | null;
  password: string | null;
}

export interface IBook{
  id: number | null;
  autor: string | null;
  pais: string | null;
  imagen: string | null;
  idioma: string | null;
  link: string | null;
  precio: number | null;
  titulo: string | null;
  year: number | null;
}

export interface ICarrito{
  idUsuario: number | null;
  idBooks: number[] | null;
  total: number | null;
  fechaCompra: string | null;
}
