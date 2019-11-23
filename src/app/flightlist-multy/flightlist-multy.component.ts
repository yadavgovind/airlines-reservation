import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Airport } from '../models/airport.info';

import { Flight } from '../models/flight';

import { UserService } from '../services/user.service';

//import { Flight } from '../models/flight';
import {SharedService} from '../services/shared-service';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { City } from '../models/city';
import { FlightFilter } from '../models/FlightFilter';




@Component({
  selector: 'app-flightlist-multy',
  templateUrl: './flightlist-multy.component.html',
  styleUrls: ['./flightlist-multy.component.scss']
})
export class FlightlistMultyComponent implements OnInit {
  roundtripenabled: boolean = false;
  airports: Airport[];
  originList: Airport[];
  destinationList: Airport[];
  cities:City[];
  departItem:Airport;
  arrivalItem:Airport;
  flightFilter: FlightFilter ;
model:any={};


  ngOnInit() {
    if(localStorage.getItem('email')){
      this.getJSON().subscribe(data => {
        this.airports=data;
        this.originList=this.airports.sort((a,b)=>a.city.trim()>b.city.trim()?1:-1);
        this.destinationList=this.airports.sort((a,b)=>a.city.trim()>b.city.trim()?1:-1);
      });
    }else{
      this.router.navigate(['/login']);
    }
    this.userService.getCity().subscribe(data=>{
      this.cities=data;
    })
  }
  constructor(private http: HttpClient, private router: Router,private userService: UserService,
  private alertService:AlertService, private _route: ActivatedRoute, private sharedService: SharedService) {
      if(localStorage.getItem('email')){
        this.getJSON().subscribe(data => {
          this.airports=data;
          this.originList=this.airports.sort((a,b)=>a.city.trim()>b.city.trim()?1:-1);
          this.destinationList=this.airports.sort((a,b)=>a.city.trim()>b.city.trim()?1:-1);
        });
      }else{
        this.router.navigate(['/login']);
      }

}
  public getJSON(): Observable<any> {
    return this.http.get("../../assets/airports.json");
}

searchFlights(){
  console.log("city name id "+this.model.arrivingCity);
  
  this.userService.searchFlights(this.model)
      .subscribe(
          data => {
            console.log("flight search sucess data:"+data);

        },
        error => {
          console.log("flight search failed data");
        });
}
  myClickFunction(value:String) {
    if(value=="ROUND-TRIP"){
    this.roundtripenabled=true;
  }else{
    this.roundtripenabled=false;
  }
 }
}
