import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, User } from '../Modelos';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlBooks="http://localhost:3000";
  private urlUsers="http://localhost:3004";

  constructor(private http: HttpClient) { }

  public getObservableProducts(): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.urlBooks}/books?_page=0&_limit=6`);
  }

  public getObservableUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.urlUsers}/users`);
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

}
