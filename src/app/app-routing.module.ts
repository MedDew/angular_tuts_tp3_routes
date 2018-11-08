import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarListComponent } from "./car-list/car-list.component";
import { CarDetailComponent } from "./car-detail/car-detail.component";
import { CarCreateComponent } from "./car-create/car-create.component";
import { CarDeleteComponent } from "./car-delete/car-delete.component";
import { CarUpdateComponent } from "./car-update/car-update.component";

const routes : Routes = [
    { path : "carList" , component : CarListComponent},
    //Used for showing a particular car as well as updating a car
    { path : "carList/:carId" , component : CarDetailComponent},
    { path : "carCreate" , component : CarCreateComponent},
    { path : "carDeletion/:id" , component : CarDeleteComponent},
    { path : "carUpdate/:ID" , component : CarUpdateComponent}
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class AppRoutingModule
{

}