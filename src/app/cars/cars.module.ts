import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars.component';
//THE FACT OF IMPORTING CarListModule IN THE Cars PARENT MODULE
//IN THE imports ATTRIBUTE OF THE NgModule DECORATOR 
//DOES NOT WORK TO USE CarListComponent SELECTOR
import { CarListModule } from '../car-list/car-list.module';
//DECLARING CarListComponent HOWEVER WORKS TO USE 
//CarListComponent SELECTOR
import { CarListComponent } from '../car-list/car-list.component';
import { CarDetailComponent } from '../car-detail/car-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CarCreateComponent } from '../car-create/car-create.component';
import { CarDeleteComponent } from '../car-delete/car-delete.component';
import { CarUpdateComponent } from '../car-update/car-update.component';
import { HorsepowerCustomPipePipe } from '../car-list/horsepower-custom-pipe.pipe';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CarsComponent, CarListComponent, CarDetailComponent, CarCreateComponent, CarDeleteComponent, CarUpdateComponent, HorsepowerCustomPipePipe],//
  exports : [CarsComponent]//, CarListComponent
})
export class CarsModule { }
