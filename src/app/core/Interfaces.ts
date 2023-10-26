export interface IUser{
  username: string | null;
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

export interface IProducto{
  id: number | null;
  title: string | null;
  price: number | null;
  category: string | null;
  description: string | null;
  image: string | null;
}
