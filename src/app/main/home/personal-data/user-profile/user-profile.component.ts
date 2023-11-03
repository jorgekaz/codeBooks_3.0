import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/api-service/common.services';
import { UsersService } from 'src/app/core/api-service/users.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  logued: boolean = false;
  userName: string | null = '';
  idUsuario: number | null = 0;



  formulario: FormGroup;

  constructor(private formEdit: FormBuilder, private commonService: CommonService,
    private router: Router, private userService: UsersService,
    private snackBar: MatSnackBar) {
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

  ngOnInit(): void {
    if (this.userLogued()) {
      console.log("adentro entrando al perfil");
      this.obtenerUsuario();
    } else {
      this.router.navigateByUrl("/");
    }
  }

  userLogued(): boolean {
    if (this.commonService.userLogued()) {
      this.logued = true;
      this.userName = localStorage.getItem('userName');
      this.idUsuario = Number(localStorage.getItem('idUsuario'));
      return true;
    } else {
      this.logued = false;
      console.log("queriendo entrar al perfil por afuera");
    }
    return false;
  }

  obtenerUsuario() {
    const id: number = Number(this.idUsuario);
    this.userService.getUserById(id).then((data) => {

      this.formulario.setValue({
        ['nombre']: data.nombre,
        ['apellido']: data.apellido,
        ['direccion']: data.direccion,
        ['telefono']: data.telefono,
        ['email']: data.email,
        ['password']: '',
        ['confirmPassword']: ''
      })
    })
  }

  guardarCambios() {
    if (this.formulario.valid) {
      this.formulario.setValue({
        ['nombre']: this.formulario.get('nombre')?.value,
        ['apellido']: this.formulario.get('apellido')?.value,
        ['direccion']: this.formulario.get('direccion')?.value,
        ['telefono']: this.formulario.get('telefono')?.value,
        ['email']: this.formulario.get('email')?.value,
        ['password']: this.formulario.get('password')?.value,
        ['confirmPassword']: this.formulario.get('password')?.value
      })
      console.log(this.formulario.value);
      this.userService.updateUser(this.formulario.value, Number(this.idUsuario)).then((data) => {
        this.snackBar.open("Datos Modificados Satisfactoriamente", "", {
          duration: 2000
        });
        this.router.navigateByUrl('/?id=' + localStorage.getItem('accessToken'));
      })
    }
  }

  volverInicio() {
    this.commonService.volverInicio();
  }

  // Validacion que devulve isValid
  passwordsIguales(): ValidatorFn {
    return () => {

      const password = this.formulario.get('password')?.value;
      const repeat_password = this.formulario.get('confirmPassword')?.value;

      if (!password || !repeat_password) return { isValid: false, mismatch: true };

      if (password !== repeat_password) return { isValid: false, mismatch: true };

      return null;
    };
  }
}
