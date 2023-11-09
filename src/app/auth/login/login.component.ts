import { UsersService } from 'src/app/core/api-service/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Modelos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/api-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  email: string = '';
  password: string = '';
  hide: boolean = true;

  usuarios: User[] = [];

  formulario: FormGroup;

  constructor(private formEdit: FormBuilder,
              private router: Router,
              private userService: UsersService,
              private snackBar: MatSnackBar,
              private authService: AuthService ){
    this.formulario = this.formEdit.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(){
    this.userService.userLoguin(this.formulario.get('email')?.value, this.formulario.get('password')?.value).then((data) =>{
      // Si tengo una respuesta correcta guardo informacion en el servicio auth
      this.authService.setToken(data.accessToken);
      this.authService.setUser(data.user);
      this.router.navigate(['/']);
    },
    (error) => {
      console.log(error.error);
       this.snackBar.open("Error de usuario o contraseña", "",{
          duration: 3000
        });
      });
  }
}
