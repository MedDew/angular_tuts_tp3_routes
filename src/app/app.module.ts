import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CarsModule } from './cars/cars.module';
import { CarsComponent } from './cars/cars.component';
import { API_BASE_CONFIG } from './app.config';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CarUpdateComponent } from './car-update/car-update.component';
//import { ReactiveFormsModule } from '@angular/forms';
//import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    // CarUpdateComponent, 
  ],
  imports: [
    BrowserModule,
    CarsModule,
    HttpClientModule,
    //AppRoutingModule
    //ReactiveFormsModule
  ],
  providers: [{ provide : API_BASE_CONFIG, useValue : API_BASE_CONFIG.API_BASE_URL}],
  bootstrap: [AppComponent]
})
export class AppModule { }
