import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingRoutingModule } from './app-routing-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from "../car-list/car-list.component";

const routes : Routes = [
  { path : "carList" , component : CarListComponent}
];


@NgModule({
  imports: [
    CommonModule,
    AppRoutingRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
