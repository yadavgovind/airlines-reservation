import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Flight } from '../models/flight';
 

@Component({
  selector: 'app-flight-cancel',
  templateUrl: './flight-cancel.component.html',
  styleUrls: ['./flight-cancel.component.scss']
})
export class FlightCancelComponent implements OnInit {

  flights: Flight[];
  
  flightId:any;
  travelDate:any;
 
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
this.userService.cancelFlight({flightId:this.flightId,travelDate:this.travelDate}).subscribe(data=>{
console.log("success"+data)
},error=>{
  console.log("error"+error)
})
  }
}
