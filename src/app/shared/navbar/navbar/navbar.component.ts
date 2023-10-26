import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() mensaje: EventEmitter<string>;
  title = 'CodeBook';

  constructor(private router: Router, private cookies: CookieService){
    this.mensaje = new EventEmitter();
  }

  home(){
    if (this.cookies.check('X-Auth-Token')){
      this.router.navigateByUrl("/?id=" + this.cookies.get('X-Auth-Token'))
    } else{
      this.router.navigateByUrl("/");
    }
    this.mensaje.emit("false");
  }

}
