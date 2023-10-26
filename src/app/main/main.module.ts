import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../auth/auth.module';


import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';


import 'hammerjs';
//import { NavbarComponent } from '../shared/navbar/navbar/navbar.component';


@NgModule({
  declarations: [
    HomeComponent,
  //  NavbarComponent
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
    MatTooltipModule
  ]
})
export class MainModule { }
