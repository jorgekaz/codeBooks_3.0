import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Book } from '../Modelos';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) { }

  getProducts(): Promise<Book[]>{
    return new Promise((res, rej) =>{
      this.apiService.getCarrito('').subscribe({
         next: data => res(data),
         error: error => rej(error)
      })
    })
  }

  searchProducts(search: string): Promise<Book[]>{
    return new Promise((res, rej) => {
      this.apiService.getCarrito(search).subscribe({
        next: data => res(data),
        error: error => rej(error)
      })
    })
  }
}
