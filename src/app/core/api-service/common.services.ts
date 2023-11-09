import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private router: Router, private authService: AuthService) { }

    isLogued(): boolean {
      if (this.authService.getToken() != ''){
        return true;
      }
      return false;
    }

    volverInicio() {
      this.router.navigate(['/']);
    }
}
