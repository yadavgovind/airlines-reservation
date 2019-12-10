import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Flight } from '../models/flight';
import { Flightshedule } from '../models/flightShedule';

@Component({
  selector: 'app-flight-cancel',
  templateUrl: './flight-cancel.component.html',
  styleUrls: ['./flight-cancel.component.scss']
})
export class FlightCancelComponent implements OnInit {

  flights: Flight[];
  flightShedule:Flightshedule;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadFlights();
   
  }


  loadFlights(){
    
    this.userService.getFlights().subscribe(data=>{
      this.flights = data;  
     },error=>{
       console.log("error"+error);
     }
     
     );

  }
  flightCancel(){
this.userService.cancelFlight().subscribe(data=>{
console.log("success"+data)
},error=>{
  console.log("error"+error)
})
  }
}
