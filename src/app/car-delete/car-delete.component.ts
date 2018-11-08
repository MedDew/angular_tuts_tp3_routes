import { Component, OnInit } from '@angular/core';
import { CarService } from '../car-service/car.service';
import { Car } from '../cars/shared/car.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {

  car : Car;
  deletedCar : Car;
  isDeletedCar : boolean;

  constructor(private carService : CarService, private router : Router, private route : ActivatedRoute) 
  {
    this.route.params.subscribe(
      (param : Params) => {
        console.log(param.id);
        this.carService.getCarById(param.id)
        .subscribe( (car : Car) => this.car = car);
      }
    );
    this.isDeletedCar = false;
  }

  ngOnInit() 
  {
  }

  onCarDeletion(car : Car)
  {
    const deletedCar = Object.assign(new Car(), car);
    //Useless : we can still use car instance variable 
    //this.deletedCar = deletedCar;
    this.carService.deleteCar(deletedCar);
    //.subscribe((response) => console.log("DELETED CAR : "+response));
    // this.router.navigate(["carList"]);
  }
}
