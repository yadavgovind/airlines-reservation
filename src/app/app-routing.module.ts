import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RigisterComponent } from './rigister/rigister.component';
import { AboutComponent } from './about/about.component';

import { FlightlistMultyComponent } from './flightlist-multy/flightlist-multy.component';
import { CardPaymentComponent } from './card-payment/card-payment.component';
import { HeaderComponent } from './header/header.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { AuthGuard } from './auth-guard.service';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { AuthAdminGuard } from './auth-admin-guard.service';
import { FlightCancelComponent } from './flight-cancel/flight-cancel.component';


const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"rigister",component:RigisterComponent},
  {path:"",component:FlightlistMultyComponent},
  {path:"flights",component:FlightlistMultyComponent,canActivate:[AuthGuard]},
  {path:"payment",component:CardPaymentComponent},
  {path:"header",component:HeaderComponent},
  {path:"reservation",component: ReservationDetailsComponent},
  {path:"adminhome",component: AdminhomeComponent,canActivate:[AuthAdminGuard]},
  {path:"flightCancel",component: FlightCancelComponent,canActivate:[AuthAdminGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
