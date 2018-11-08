import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CarService } from '../car-service/car.service';
import { Car } from '../cars/shared/car.model';
import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit 
{
  carList : Car[];
  @Input() selectCar : Car;
  @Output() carSelected = new EventEmitter<Car>();
  carDeleted : Car;
  isCarDeleted : boolean;
  setIntervalId : number;
  countDownInterval : number;

  constructor(private carService : CarService, private router : Router, private activatedRoute : ActivatedRoute)
  {
    this.isCarDeleted = false;
  }

  ngOnInit() 
  {
    this.getAllCars();
  }

  getAllCars()
  {
    this.router.navigate(["/carList"]);
    this.carService.getCarList().pipe(
      tap(
        (cars) => {
          for(let p in cars)
          {
            console.log("p : "+p+" => "+cars[p]);
          }
        } 
      )
    ).subscribe((cars : Car[]) => this.carList = cars);
  }

  getCarSelected(car : Car)
  {
    console.log("Car : ");
    const c = <Car>car;
    console.log(typeof car);
    console.log(typeof c);
    let carId : number;
    //car  is of type Object WE CAN'T USE getId() method
    //console.log("Car sent to car detail component : "+car.getId()+" => "+car.getBrand());

    //To be able to getId() method from Car object  
    const objToCarConversion = Object.assign(new Car(), car);
    console.log("Is objToCarConversion a car ? ");
    console.log(objToCarConversion instanceof Car);
    for(let p in objToCarConversion)
    {
      console.log("p : "+p+" => "+objToCarConversion[p]+" | "+objToCarConversion.getBrand()+" | "+this.selectCar);
      if(p === "id")
      {
        carId = objToCarConversion.getId();
      }
    }
    for(let v of Object.values(car))
    {
      console.log("v : "+v);
    }
    // let foundCar = this.carList.find(this.findCar, carId);
    let foundCar = this.carList.find(this.findCar, objToCarConversion.getId());
    //brand IS A PRIVATE PROPERTY HOWEVER YOU CAN USE IT  
    // console.log("Found Car : "+foundCar.brand);
    this.carSelected.emit(foundCar);
    // this.router.navigate(["/cars", foundCar.id]);
    console.log("Found Car : "+foundCar["id"]+" => "+foundCar["brand"]);
    //this.router.navigate(["/cars", foundCar["id"]);
    
    
    // Object.keys(foundCar).forEach(function(element)
    //   {
    //     console.log("element : "+element+" => "+foundCar[element]);
    //   }
    // );
  }

  findCar(element)
  {
    console.log("typeof element : "+typeof element);
    console.log("element.id : "+element.id);
    console.log("element.brand : "+element.brand);
    console.log("this : "+this);
    return element.id === this;
    // return element.getId() === this;
  }

  onCarSelected(car : Car)
  {
    console.log("onCarSeleted : "+car["brand"]+" | "+car["test"]);
    this.carSelected.emit(car);
  }

  onSelectCar(car : Car)
  {
    this.router.navigate(["/carList", car["id"]]);
  }

  displayCarDeleted()
  {
    console.log("counter val = "+this.countDownInterval);
    if(this.countDownInterval == 0)
    {
      console.log("DELETED CAR MESSAGE DISPLAY IS OVER REDIRECT TO CARLIST");
      this.isCarDeleted = false;
      console.log("this.setIntervalId destroy : "+this.setIntervalId);
      clearInterval(this.setIntervalId);
      //Refresh the page to see the updated list with the car freshly deleted
      //window.location.reload();
      this.ngOnInit();

    }
    else
    {
      this.isCarDeleted = true;
      console.log("counter : "+this.countDownInterval);
      this.countDownInterval--;
    }
  }

  onDeleteDirectly(car : Car, event : Event)
  {
    //Prevent from bubbling up to the parent click event
    event.stopPropagation();
    console.log("DIRECT CAR DELETION");
    const deletedCar = Object.assign(new Car(), car);
    this.carDeleted = deletedCar;
    this.carService.deleteCar(deletedCar)
    .subscribe((response) => console.log("Car directly deleted : "+response));
    this.isCarDeleted = true;

    //Init the count down for the lapse of time used to display the deleted car 
    this.countDownInterval = 20;
    this.setIntervalId = setInterval(() => this.displayCarDeleted(), 1000);
    console.log("this.setIntervalId : "+this.setIntervalId+" | "+typeof this.setIntervalId);
  }
}
