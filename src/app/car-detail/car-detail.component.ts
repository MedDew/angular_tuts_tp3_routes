import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Car } from '../cars/shared/car.model';
import { CarService } from '../car-service/car.service';
import { tap, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  @Input() car : Car;
  isCarEdition : boolean;
  carFormEditionGroup : FormGroup;

  constructor(private router :Router, private carService: CarService, private route : ActivatedRoute, private formBuilder : FormBuilder) 
  {
    console.log("CONSTRUCTOR : "+this.car);
    this.carFormEditionGroup = this.formBuilder.group(
      {
        id : [""],
        brand : ["", Validators.required],
        model : ["", Validators.required],
        price : ["", Validators.required],
        seats : ["", Validators.required],
        horsePower : ["", Validators.required],
        weight : ["", Validators.required],
      }
    );
    this.isCarEdition = false;
  }

  ngOnInit() 
  {
    console.log("isCarEdition : "+this.isCarEdition);
    console.log("car : "+this.car+" | "+this.route.toString());
    for(let p in this.route.params)
    {
      console.log("p : "+p);
      
    }

    this.route.params.subscribe(
      (param : Params) => {
        console.log("param passed to detail : "+param);
        console.log("param passed to detail : "+param["carId"]);
        for(let p in param)
        {
          console.log("p ====> "+p);
        }

        this.getCarDetail(param["carId"])
        .subscribe((car : Car) => {
            console.log("CAR : "+car["id"]+" | "+typeof car);
            const objectToCarConversion = Object.assign(new Car(), car);
            // this.car = car;
            this.car = objectToCarConversion;
            console.log("CAR ID : "+this.car.getId());
            console.log("CAR BRAND : "+this.car.getBrand());

            //THIS IS THE WAY TO SET THE PRESET VALUES OF EACH FIELD OF THE FORM GROUP
            this.carFormEditionGroup.get("id").setValue(this.car.getId());
            this.carFormEditionGroup.get("brand").setValue(this.car.getBrand());
            this.carFormEditionGroup.get("model").setValue(this.car.getModel());
            this.carFormEditionGroup.get("price").setValue(this.car.getPrice());
            this.carFormEditionGroup.get("seats").setValue(this.car.getNbSeats());
            this.carFormEditionGroup.get("horsePower").setValue(this.car.getHorsePower());
            this.carFormEditionGroup.get("weight").setValue(this.car.getWeight());
          }
        );
        console.log("this.car : "+this.car);
      }
    );
    //this.getCarDetail();
  }

  getCarDetail(carId : number) : Observable<Car>
  {
    return this.carService.getCarById(carId);
  }

  editCar()
  {
    this.isCarEdition = !this.isCarEdition;
  }
  
  onCarEdit(formValue : FormGroup)
  {
    console.log("CAR VALUE TO UPDATE : ");
    for(let p in this.carFormEditionGroup.value)
    {
      console.log("p : "+p+" => "+this.carFormEditionGroup.value[p]);
    }

    console.log("+++++++++++++++++++++++++++++++++++++++++++++++");

    for(let c in formValue.value)
    {
      console.log("c ++> "+c+" => "+formValue.value[c]);
    }
    console.log("BRAND VALUE : "+formValue.get("brand").value);
    console.log("MODEL VALUE : "+formValue.get("model").value);
    console.log("PRICE VALUE : "+formValue.get("price").value);
    console.log("SEATS VALUE : "+formValue.get("seats").value);
    console.log("HORSEPOWER VALUE : "+formValue.get("horsePower").value);
    console.log("WEIGHT VALUE : "+formValue.get("weight").value);

    let updatedCar = Object.assign(new Car(), this.carFormEditionGroup.value);
    //Bind seats FormControl field to nbSeats model property
    updatedCar.setNbSeats(this.carFormEditionGroup.get("seats").value);
    // delete updatedCar.seats;
    console.log(updatedCar);
    this.carService.putCar(updatedCar)
    .subscribe((response) => {
      console.log("RESPONSE : "+response);

      //Prevent the edition mode 
      this.isCarEdition = false;
      //Assign car instance variable with the value of the updated car 
      this.car = updatedCar;
      //Redirect to the updated car 
      this.router.navigate(["/carList", updatedCar.getId()]);
    });
  }
}
