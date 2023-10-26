import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../Modelos';
import { CookieService } from 'ngx-cookie-service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService, private cookies: CookieService) { }

  getUsers(): Promise<User[]>{
    return new Promise((res, rej) => {
      this.apiService.getObservableUsers().subscribe({
        next: data => res(data),
        error: error => rej(error)
      })
    })
  }

  setUser(user:User): Promise<any>{
    return new Promise((res, rej) => {
      this.apiService.postUser(user).subscribe({
        next: data => res(data),
        error: error => rej(error)
      })
    })
  }

  setToken() {
    this.cookies.set("X-Auth-Token", uuidv4());
  }
  getToken() {
    return this.cookies.get("X-Auth-Token");
  }
}
