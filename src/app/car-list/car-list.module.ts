import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarListComponent } from './car-list.component';
import { CarService } from '../car-service/car.service';
import { RouterModule } from '@angular/router';
import { CarDetailComponent } from '../car-detail/car-detail.component';
import { HorsepowerCustomPipePipe } from './horsepower-custom-pipe.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CarListComponent, HorsepowerCustomPipePipe],
})
export class CarListModule { }
