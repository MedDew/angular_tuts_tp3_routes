import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_BASE_CONFIG } from '../app.config';
import { Observable } from 'rxjs';
import { Car } from '../cars/shared/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private headers : Object;

  constructor(private http : HttpClient, @Inject(API_BASE_CONFIG) private apiURL : string)//, private headers : Object 
  {
    this.headers = { headers : new HttpHeaders({ "Accept" : "application/json", "Content-Type" : "application/json" }) };
  }

  getCarList() : Observable<Car[]>
  {
    return this.http.get<Car[]>(`${this.apiURL}/cars`,this.headers);
  }
  
  getCarById(carId : number) : Observable<Car>
  {
    let httpParam = new HttpParams().set("id", carId.toString());
    //httpParam.set("id", carId.toString());
    console.log("is params property exists : "+this.headers.hasOwnProperty("params"));
    console.log(httpParam);
    if(!this.headers.hasOwnProperty("params"))
    {
      console.log("httpParam : "+httpParam);
      //this.headers["params"] = httpParam;
    }
    for(let p in this.headers)
    {
      console.log("p +++> "+p+" => "+this.headers[p]);
    }
    return this.http.get<Car>(`${this.apiURL}/cars/${carId}`, this.headers);//{params : httpParam} 
  }

  putCar(car : Car)
  {
    console.log("CAR TO EDIT : "+car.getId()+" =>> "+car.getBrand());
    console.log("CAR TO EDIT : "+JSON.stringify(car));
    console.log("CAR TO EDIT URL : "+`${this.apiURL}/cars/${car.getId()}`);
    return this.http.put(`${this.apiURL}/cars/${car.getId()}`, JSON.stringify(car), this.headers);
    //.subscribe((response) => console.log("RESPONSE : "+response));
  }
  
  postCar(car : Car) : Observable<Car>
  {
    console.log("CAR TO CREATE : "+car.getId()+" =>> "+car.getBrand());
    console.log("CAR TO CREATE : "+JSON.stringify(car));
    console.log("CAR TO CREATE URL : "+`${this.apiURL}/cars/${car.getId()}`);
    return this.http.post<Car>(`${this.apiURL}/cars`, JSON.stringify(car), this.headers);
    //.subscribe((response) => console.log("RESPONSE : "+response));
  }
  
  deleteCar(car : Car)
  {
    console.log("DELETE CAR ===> "+car.getId());
    return this.http.delete(`${this.apiURL}/cars/${car.getId()}`, this.headers);
  }
}
