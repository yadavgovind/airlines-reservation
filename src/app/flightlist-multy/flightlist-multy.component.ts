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
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { $ } from 'protractor';




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
  flights:Flight[];
  model:any={};
  myform:FormGroup;
  passengers:any[]=[];
  controls:any[]=[];
  dummyBooking:any[]=[{"isEconomy":"true",
  "flightId":1,
  "price":5000,
  "firstName":"govind",
  "email":"urgovind7@gmail.com",
  "lastName":"Yadav",
  "phone":"7842413120"
  }];
  formBuilder:FormBuilder=new FormBuilder();
  selIndex:number=1;
  selectedFlight:Flight;

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
    });
    this.reinitFormArray();
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
this.selIndex=1;
  this.userService.searchFlights(this.model)
      .subscribe(
          data => {
            this.flights=data.arrivalFlightList;
            console.log("flight search sucess data:"+this.flights);

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

 reinitFormArray(){
  this.myform = this.formBuilder.group({
    passengers: this.formBuilder.array([ this.createItem() ])
  });
  console.log("form generated ");
  let fomarry   =   this.myform.get('passengers') as FormArray;
  this.controls =   fomarry.controls;

}

bookFlight(){
 alert( this.myform.value);
  this.userService.bookFlight(this.myform.value).subscribe(data=>{
console.log("success"+data);
  },
  error=>{
    console.log("success"+error);
  })
}
createItem(): FormGroup {
  return this.formBuilder.group({
    firstName: new FormControl('', [Validators.required]),
    lastName:  new FormControl('', [Validators.required]),
    email:     new FormControl('', [Validators.required]),
    phone:     new FormControl('', [Validators.required]),
    middleName: new FormControl('', [Validators.required])
  });
}
addRow(){
  let fomarry=this.myform.get('passengers') as FormArray;
   fomarry.push(this.createItem());
   this.controls=fomarry.controls;
}
deleteRow(index){
  let fomarry=this.myform.get('passengers') as FormArray;
  fomarry.removeAt(index);
  this.controls=fomarry.controls;
}
isFieldValid(field: string,error:string,form:FormGroup) {
  let validError=error==null?true:form.get(field).hasError(error);
  if(error!='required')
  {
    if(form.get(field).hasError('required') && form.get(field).touched)
      return false;
  }
  return (!form.get(field).valid && form.get(field).touched)&&validError;
}

validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}
firstNext() {
  this.flights.forEach(flight => {
if ( flight.flightnumber === '123') {
  this.selectedFlight = flight;
}
  });
  
this.selIndex+=1;
for(var i=0;i<this.model.adultCount-1;i++){
this.addRow();    
}
}
secondNext(){

  this.selIndex+=1;
}
thirdNext(){
  this.selIndex+=1;
  this.bookFlight();
}
}