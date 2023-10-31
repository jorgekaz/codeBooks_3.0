import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() mensaje: EventEmitter<string>;
  title = 'CodeBook';

  constructor(private router: Router){
    this.mensaje = new EventEmitter();
  }

  home(){
    if (localStorage.getItem('accessToken')){
      this.router.navigateByUrl("/?id=" + localStorage.getItem('accessToken'))
    } else{
      this.router.navigateByUrl("/");
    }
    this.mensaje.emit("false");
  }

}
