import { Component, OnInit } from '@angular/core';
import { Car } from './shared/car.model';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  constructor() { }

  ngOnInit() 
  {
    
  }


  onCarSelected(car : Car)
  {
    console.log("WHAT CAR HAS BEEN SELECTED : "+car["id"]);
    for(let p in car)
    {
      console.log("p  ::: "+p);
    }
    car["test"] = "test";
    const convertObjectToCar = Object.assign(new Car(), car);
    console.log("SELECTED CAR: "+convertObjectToCar.getId()+" | "+convertObjectToCar.getBrand()+" => "+convertObjectToCar.getHorsePower());
  }
}
