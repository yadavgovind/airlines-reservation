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
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, RequiredValidator } from '@angular/forms';
import { $ } from 'protractor';
import { Booking } from '../models/Booking';




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
  flightFilter = new FlightFilter() ;
  flights:Flight[];
  model: any={};
  myform:FormGroup;
  paymentform:FormGroup;
  passengers1:any[]=[];
  controls:any[]=[];
  bookingList:Booking[]=[];
  dummyList:any[];
  price:number;
  

  // dummyBooking:any[]=[{ 
  // "flightId":1,
  // "price":5000,
  // "firstName":"govind",
  // "email":"urgovind7@gmail.com",
  // "lastName":"Yadav",
  // "phone":"7842413120",
  // "type":"economy",

  // }];
  formBuilder:FormBuilder=new FormBuilder();
  selIndex:number=1;
  selectedFlight:Flight= undefined;

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
   this.paymentform=this.formBuilder.group({
     'card':new FormControl('',[Validators.required]),
     'year':new FormControl('',[Validators.required]),
     'month':new FormControl('',[Validators.required]),
     'cvc':new FormControl('',[Validators.required])
   });
   this.myform = this.formBuilder.group({
    passengers: this.formBuilder.array([this.createItem()])
  });
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
    passengers: this.formBuilder.array([])
  });
 
  for(let k=0;k<this.model.adultCount;k++){
   this.addRow();
  }
  let fomarry   =   this.myform.get('passengers') as FormArray;
  this.controls =   fomarry.controls;

}

bookFlight(){
 
 this.dummyList = this.myform.value;
 
 
if(this.model.type==='Economy'){
  this.price= this.selectedFlight.economyprice * this.model.adultCount;
}else{
  this.price= this.selectedFlight.business_price * this.model.adultCount;
}
 
this.dummyList['passengers'].forEach(passenger=>{
let booking= new Booking();
booking.firstName=passenger.firstName;
booking.lastName=passenger.lastName;
booking.email= passenger.email;
booking.price = this.price;
booking.type= this.model.type;
booking.flightId=this.selectedFlight.id;
booking.journyDate =this.model.travellDate;
booking.noOfSheet= this.model.adultCount;
this.bookingList.push(booking);
});

  
  this.userService.bookFlight(this.bookingList).subscribe(data=>{
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
    phone:     new FormControl('', [Validators.required])
  
  });
}
addRow(){
  let fomarry=this.myform.get('passengers') as FormArray;
   fomarry.push(this.createItem());
   this.controls=fomarry.controls;
}
deleteRow(){
  let fomarry=this.myform.get('passengers') as FormArray;
  for(let k=1;k<fomarry.length;k++)
  {
    fomarry.removeAt(k);
  }
  this.controls=[];
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
selectFlight(flight){
  this.selectedFlight = flight;
}
firstNext() {
 
  
this.selIndex+=1;
this.reinitFormArray();

}
secondNext(){

  this.selIndex+=1;
}
thirdNext(){
  if(this.myform.valid){
  this.selIndex+=1;
  }
  else{
    let fomarry=this.myform.get('passengers') as FormArray;
     Object.keys(fomarry.controls).forEach(group => {
      if(!fomarry.get(group).valid)
      this.validateAllFormFields(fomarry.get(group) as FormGroup);
   })
   }
}
bookNow(){
  this.bookFlight();
}
}