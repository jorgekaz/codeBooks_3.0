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
    if (localStorage.getItem('accessToken')){
      this.router.navigateByUrl("/?id=" + localStorage.getItem('accessToken'))
    } else{
      this.router.navigateByUrl("/");
    }
    this.mensaje.emit("false");
  }

  register(){
    this.router.navigateByUrl("/auth/register")
  }

  login(){
    this.router.navigateByUrl("/auth/login")
  }

  perfil(){
    //this.router.navigateByUrl("/personal-data/perfil")
    this.router.navigateByUrl("/personal-data/perfil?id=" + localStorage.getItem('accessToken'));
  }

  logout(){
    if (localStorage.getItem('accessToken')){
      localStorage.removeItem('accessToken');
      localStorage.removeItem('idUsuario');
      localStorage.removeItem('userName');
      this.isLogued = false;
      this.mensaje.emit("logout");
      this.router.navigateByUrl("/");
    }
  }

  verCarrito(){
    this.router.navigateByUrl("/personal-data/historial?id=" + localStorage.getItem('accessToken'));
  }
}