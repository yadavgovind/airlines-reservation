import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RigisterComponent } from './rigister/rigister.component';
import { AboutComponent } from './about/about.component';

import { FlightlistMultyComponent } from './flightlist-multy/flightlist-multy.component';
import { CardPaymentComponent } from './card-payment/card-payment.component';
import { HeaderComponent } from './header/header.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';


const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"rigister",component:RigisterComponent},
  {path:"",component:FlightlistMultyComponent},
  {path:"flights",component:FlightlistMultyComponent},
  {path:"payment",component:CardPaymentComponent},
  {path:"header",component:HeaderComponent},
  {path:"reservation",component: ReservationDetailsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
