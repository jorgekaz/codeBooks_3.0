import { UsersService } from 'src/app/core/api-service/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Modelos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  usuarios: User[] = [];

  formulario: FormGroup;

  constructor(private formEdit: FormBuilder, private router: Router, private userService: UsersService, private snackBar: MatSnackBar ){
    this.formulario = this.formEdit.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')){
      localStorage.removeItem('accessToken');
      localStorage.removeItem('idUsuario');
    }
  }

  login(){
    this.userService.userLoguin(this.formulario.get('email')?.value, this.formulario.get('password')?.value).then((data) =>{
      // Si tengo una respuesta correcta, guardo el token en localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('idUsuario', data.user.id);
      localStorage.setItem('userName', data.user.nombre + " " + data.user.apellido);
      this.router.navigateByUrl("/?id=" + data.accessToken);
    },
    (error) => {
      console.log(error.error);
       this.snackBar.open("Error de usuario o contraseña", "",{
          duration: 2000
        });
      });

  }

}
