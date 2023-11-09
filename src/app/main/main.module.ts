import { PersonalDataModule } from './home/personal-data/personal-data.module';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../auth/auth.module';



import {MainRoutingModule} from './main-routing.module';
import {HomeComponent} from './home/home.component';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

import { BusquedaComponent } from './home/componentes/busqueda/busqueda.component';
import { DetalleCompraComponent } from './home/componentes/detalle-compra/detalle-compra.component';
import { ConfirmaCompraComponent } from './home/componentes/confirma-compra/confirma-compra.component';
import { MatStepperModule } from '@angular/material/stepper';



@NgModule({
  declarations: [
    HomeComponent,
    BusquedaComponent,
    DetalleCompraComponent,
    ConfirmaCompraComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    AuthModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
    PersonalDataModule,
    MatInputModule,
    MatDialogModule,
    MatStepperModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
