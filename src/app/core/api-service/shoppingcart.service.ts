import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Carrito } from '../Modelos';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {



  constructor(private apiService: ApiService) { }

  getCartByUserId(id: number): Promise<Carrito[]>{
    return new Promise((res, rej) => {
      this.apiService.getObservableCarritos(id).subscribe({
        next: data => res(data),
        error: error => rej(error)
      })
    })


  }
}
