import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, Carrito, User } from '../Modelos';
import { environments } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlBooks= environments.urlBooks;
  private urlUsers= environments.urlUsers;

  constructor(private http: HttpClient) { }

  public getObservableProducts(): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.urlBooks}/books?_page=0&_limit=6`);
  }

  public getObservableUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.urlUsers}/users`);
  }

  public getObservableUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.urlUsers}/users/${id}`);
  }

  public getObservableBook(id: number): Observable<Book>{
    return this.http.get<Book>(`${this.urlBooks}/books/${id}`);
  }

  public postUser(user: User): Observable<any> {
    let json = JSON.stringify(user);
    return this.http.post(`${this.urlUsers}/register`, json, {headers: {'Content-Type': 'application/json'}});
  }

  public userLoguin(usuario: string, password: string): Observable<any> {
    const jsonString = `{"email": "${usuario}", "password": "${password}"}`;
    return this.http.post(`${this.urlUsers}/login`, jsonString, {headers: {'Content-Type': 'application/json'}});
  }

  public getCarrito(search: string): Observable<Book[]> {
    return this.http.get<any[]>(`${this.urlBooks}/books?q=${search}`);
  }

  public guardarCarrito(idUsuario: number, cart: number[], costoTotal: number): Observable<any>{
    const fechaActual = new Date().toLocaleString();
    const carrito = new Carrito(idUsuario, cart, costoTotal, fechaActual);
    const json = JSON.stringify(carrito);
    return this.http.post(`${this.urlUsers}/carritos/`, json,{headers: {'Content-Type': 'application/json'}} );

  }

  public updateUser(datosFormulario: string, idUsuario: number): Observable<any>{

    const json = JSON.stringify(datosFormulario);
    return this.http.patch(`${this.urlUsers}/users/${idUsuario}`, json, {headers: {'Content-Type': 'application/json'}} );
  }

  public getObservableCarritos(id: number): Observable<Carrito[]>{
      return this.http.get<Carrito[]>(`${this.urlUsers}/carritos?idUsuario=${id}`);
  }
}
