import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { Error404Component } from './error404/error404.component';

import { MatIconModule } from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    NavbarComponent,
    Error404Component
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    DragDropModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    DragDropModule,
    MatListModule,
    NavbarComponent
  ]
})
export class SharedModule { }