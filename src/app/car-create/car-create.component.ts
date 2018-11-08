import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarService } from '../car-service/car.service';
import { Car } from '../cars/shared/car.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css']
})
export class CarCreateComponent implements OnInit 
{
  carFormCreationGroup : FormGroup;
  carCreated : Car;
  isCarCreated : Boolean;

  constructor(private formBuilder : FormBuilder, private carService : CarService, private router : Router) 
  { 
    this.carFormCreationGroup = this.formBuilder.group({
      brand : ["", Validators.required],
      model : ["", Validators.required],
      price : ["", Validators.required],
      seats : ["", Validators.required],
      horsePower : ["", Validators.required],
      weight : ["", Validators.required]
    });
    this.isCarCreated = false;
  }
  
  ngOnInit() 
  {
  }
  
  onCarCreate()
  {
    console.log("BRAND : "+this.carFormCreationGroup.get("brand").value);
    console.log("MODEL : "+this.carFormCreationGroup.get("model").value);
    console.log("PRICE : "+this.carFormCreationGroup.get("price").value);
    console.log("SEATS  : "+this.carFormCreationGroup.get("seats").value);
    console.log("HORSEPOWER  : "+this.carFormCreationGroup.get("horsePower").value);
    console.log("WEIGHT  : "+this.carFormCreationGroup.get("weight").value);
    let createdCar = Object.assign(new Car(), this.carFormCreationGroup.value);
    
    //Bind seats FormControl field to nbSeats model property
    createdCar.setNbSeats(this.carFormCreationGroup.get("seats").value);
    //Delete setas property from the oBject to respect the car model properties 
    delete createdCar.seats;
    this.carService.postCar(createdCar)
    .subscribe(
      (response : any) => {
        console.log(JSON.stringify(response));
        console.log(response.value);
        //JSON.stringify(response);
        this.carCreated = response.value;
        this.isCarCreated = true;
      }
      );
    }
    
    backToCarCreation()
    {
      console.log("CREATE A CAR AGAIN");
      this.router.navigate(["carCreate"]);
      this.carFormCreationGroup.reset();
      this.isCarCreated = false;
    }
}
