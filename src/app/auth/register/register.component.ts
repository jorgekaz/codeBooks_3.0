import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Modelos';
import { UsersService } from 'src/app/core/api-service/users.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/api-service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  hide: boolean = true;
  hide2: boolean = true;

  formulario: FormGroup;

  constructor(private formEdit: FormBuilder,
              private userService: UsersService,
              private router: Router,
              private snackBar: MatSnackBar,
              private authService: AuthService) {
    this.formulario = this.formEdit.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]],
    });
    // Validacion que devuelve si es valido o no el formulario
    this.formulario.get('confirmPassword')?.setValidators([Validators.required, this.passwordsIguales()]);

  }

  register() {
    const user = new User(this.formulario.value);

    this.userService.setUser(user).then((data) => {
      this.authService.setToken(data.accessToken);
      this.authService.setUser(data.user);
      this.snackBar.open("Usuario registrado en forma satisfactoria.", "",{
        duration: 3000
      });
      this.router.navigate(['/']);

    }).catch((error) => {
      this.snackBar.open("Hubo un error al registrarse", "",{
        duration: 2000
      });
    });
  }

  // Validacion de passwords iguales
  passwordsIguales() : ValidatorFn {
    return () => {

      const password = this.formulario.get('password')?.value;
      const repeat_password = this.formulario.get('confirmPassword')?.value;

      if(!password || !repeat_password) return { isValid: false, mismatch: true };

      if(password!==repeat_password) return {isValid:false, mismatch: true};

      return null;
    };
  }
}
