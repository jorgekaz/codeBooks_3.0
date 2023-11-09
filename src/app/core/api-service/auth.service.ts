import { Injectable } from '@angular/core';
import { User } from '../Modelos';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _token: string = '';
  _user: User = new User();

  constructor() { }

  public setToken(token: string){
    this._token = token;
  }

  public getToken(): string{
    return this._token;
  }

  public setUser(user: User){
    this._user = user;
  }

  public getUser(): User{
    return this._user;
  }
}
