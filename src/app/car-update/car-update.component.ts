import { Component, OnInit } from '@angular/core';
import { CarService } from '../car-service/car.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Car } from '../cars/shared/car.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit 
{
  car : Car;
  carUpdateFormGroup : FormGroup;
  updatedCar : Car;
  isCarUpdated : boolean;

  constructor(private carService : CarService, private formBuilder : FormBuilder, private activatedRoute : ActivatedRoute) 
  {
    this.isCarUpdated = false;
    this.carUpdateFormGroup = this.formBuilder.group(
      {
        id : ["", Validators.required],
        brand : ["", Validators.required],
        model : ["", Validators.required],
        price : ["", Validators.required],
        nbSeats : ["", Validators.required],
        horsePower : ["", Validators.required],
        weight : ["", Validators.required],
      }
    );
    this.activatedRoute.params.subscribe(
                                          (param : Params) => 
                                          {
                                            console.log(param);
                                            console.log(param.id);
                                            console.log(param.ID);
                                            this.carService.getCarById(param.ID)
                                            .subscribe(
                                                        (car : Car) => 
                                                        {
                                                          const foundCar = Object.assign(new Car(), car); 
                                                          this.car = foundCar;
                                                          console.log("this.car : "+this.car.getId());
                                                          //MUCH QUICKER THAN setValue                                  
                                                          this.carUpdateFormGroup.patchValue(this.car);
                                                        }
                                                      );
                                          }
                                        );
  }

  ngOnInit() 
  {

  }

  onCarUpdate()
  {
    this.isCarUpdated = true;
    console.log("UPDATE CAR : "+this.carUpdateFormGroup.get("brand").value+" => "+this.carUpdateFormGroup.get("model").value);
    const updatedCar = Object.assign(new Car(), this.carUpdateFormGroup.value);
    for(let p in this.carUpdateFormGroup.value)
    {
      console.log("p :: "+p+" => "+this.carUpdateFormGroup.value[p]);
    }
    this.updatedCar = updatedCar;
    this.carService.putCar(updatedCar)
    .subscribe((response) => console.log("Updated CAR : "+response) );
  }
}
