import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private router: Router) { }

    userLogued(): boolean {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const token = localStorage.getItem('accessToken');
        if (id === token && token != null) {
            return true
        } else {
            localStorage.removeItem('accessToken');
            return false;
        }
    }

    volverInicio() {
        this.router.navigateByUrl('/?id=' + localStorage.getItem('accessToken'));
    }
}