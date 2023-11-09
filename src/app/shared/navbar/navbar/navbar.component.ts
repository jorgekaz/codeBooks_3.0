import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // Emitir info hacia un elemento padre
  @Output() mensaje: EventEmitter<string>;

  // Recibir info de un elemento padre
  @Input() isLogued: boolean;
  @Input() userName: string | null;
  @Input() idUsuario: number | null;

  title = 'CodeBook';

  constructor(private router: Router){
    this.mensaje = new EventEmitter();
    this.isLogued = false;
    this.userName = '';
    this.idUsuario = 0;
  }

  home(){
    this.router.navigate(['/']);
    this.mensaje.emit("goHome");
  }

  register(){
    this.router.navigate(['auth', 'register']);
  }

  login(){
    this.router.navigate(['auth', 'login']);
  }

  logout(){
    this.isLogued = false;
    this.mensaje.emit("logout");
    this.router.navigate(['/']);
  }

  perfil(){
    this.router.navigate(['personal-data', 'perfil']);
  }

  verCarrito(){
    this.router.navigate(['personal-data', 'historial']);
  }
}
