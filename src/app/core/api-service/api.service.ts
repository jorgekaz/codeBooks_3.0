import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Book[]>(`${this.urlBooks}/books`);
  }

  public getObservableUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.urlUsers}/users`);
  }

  public postUser(user: User): Observable<any> {
    console.log("Usuario: " + user.nombre);
    console.log("Password: " + user.password);
    let json = JSON.stringify(user);
    console.log(json);
    return this.http.post(`${this.urlUsers}/users`, json, {headers: {'Content-Type': 'application/json'}});
  }

/*saveUser(data) {
return new Promise((resolve, reject) => {
this.http.post(this.apiUrl+'/users', JSON.stringify(data)).subscribe(res => {
resolve(res);
}, (err) => {
reject(err);
});
});
} */

}
