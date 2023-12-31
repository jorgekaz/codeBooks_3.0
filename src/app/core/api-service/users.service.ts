import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../Modelos';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService) { }

  getUsers(): Promise<User[]>{
    return new Promise((res, rej) => {
      this.apiService.getObservableUsers().subscribe({
        next: data => res(data),
        error: error => rej(error)
      })
    })
  }

  getUserById(id: number): Promise<User>{
    return new Promise((res, rej) => {
      this.apiService.getObservableUser(id).subscribe({
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

  userLoguin(usuario: string, password: string): Promise<any> {
    return new Promise((resp, rej) => {
      this.apiService.userLoguin(usuario, password).subscribe({
        next: data => resp(data),
        error: error => rej(error)
      })
    })
  }

  updateUser(datosFormulario: string, idUsuario: number){
    return new Promise((resp, rej) => {
      this.apiService.updateUser(datosFormulario, idUsuario).subscribe({
        next: data => resp(data),
        error: error => rej(error)
      })
    })
  }
}