import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Flight } from '../models/flight';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
 

@Component({
  selector: 'app-flight-cancel',
  templateUrl: './flight-cancel.component.html',
  styleUrls: ['./flight-cancel.component.scss']
})
export class FlightCancelComponent implements OnInit {

  flights: Flight[];
  formBuilder: FormBuilder = new FormBuilder();
 
 flightShedule: FormGroup;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadFlights();
  this.flightShedule= this.formBuilder.group({
     flightId: new FormControl('',[Validators.required]),
     travelDate: new FormControl('',[Validators.required])
   });
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
this.userService.cancelFlight(this.flightShedule.value).subscribe(data=>{
console.log("success"+this.flightShedule.value)
},error=>{
  console.log("error"+error)
})
  }
}
