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
      this.apiService.getObservableProducts().subscribe({
         next: data => res(data),
         error: error => rej(error)
      })
    })
  }

}
