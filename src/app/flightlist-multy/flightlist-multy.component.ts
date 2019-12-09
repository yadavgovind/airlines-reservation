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
  returnFlights:Flight[];
  model: any={};
  myform:FormGroup;
  paymentform:FormGroup;
  passengers1:any[]=[];
  controls:any[]=[];
 
  price:number;
  
   bookingStatus:boolean=false;
   bookingmsg:any;
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
  returnSelectedFlight:Flight=undefined;
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
this.bookingStatus=false;
this.returnSelectedFlight=undefined;
this.selectedFlight=undefined;
this.paymentform.reset();
  this.userService.searchFlights(this.model)
      .subscribe(
          data => {
            this.flights=data.arrivalFlightList;
            this.returnFlights=data.departFlightList;
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
 let book:any={};
 book.passengers = this.myform.value['passengers'];
book.price = this.price;
book.type= this.model.type;
book.flightId=this.selectedFlight.id;
book.journyDate =this.model.travellDate;
book.noOfSheet= this.model.adultCount;
if(this.returnSelectedFlight!=undefined){
  book.returnFlightId=this.returnSelectedFlight.id;
  book.returnDate =this.model.returnDate;
}
this.userService.bookFlight(book).subscribe(data=>{
  console.log("success"+data.status);
  this.bookingmsg=data.status;
  this.bookingStatus=true;
  this.selIndex+=1;
},
  error=>{
    console.log("ERROR"+error);
    this.bookingmsg=error;
    this.bookingStatus=false;
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
selectReturnFlight(flight){
this.returnSelectedFlight=flight;
}
firstNext() { 
  if(this.selectedFlight==undefined){
    alert('Select Flight');
    return;
  }
  if(this.model.returnDate==undefined){
   this.selIndex+=2;
   this.reinitFormArray();
  }
  else{
  this.selIndex+=1;
  }

}
returnSelectNext(){
  if(this.returnSelectedFlight==undefined){
    alert('Select return Flight');
    return;
  }
  this.selIndex+=1;
  this.reinitFormArray();
}
secondNext(){

  this.selIndex+=1;
  let totalPrice=0;
  if(this.model.type==='Economy'){
    totalPrice= this.selectedFlight.economyprice * this.model.adultCount;
  }else{
    totalPrice= this.selectedFlight.business_price * this.model.adultCount;
  }
  if(this.selectReturnFlight!=undefined){
    if(this.model.type==='Economy'){
      totalPrice+= this.selectedFlight.economyprice * this.model.adultCount;
    }else{
      totalPrice+= this.selectedFlight.business_price * this.model.adultCount;
    }
  }
  this.price=totalPrice;

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