import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UserService } from '../services/user.service';

import { User } from '../models/user';
import {SharedService} from '../services/shared-service';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    [x: string]: any;
    model: any = {'agree':'','userName':'', 'mobileNumber':''};
    message = false;
    loading = true;
    displaymessage:string
  constructor(
   private userService: UserService,
   private alertService:AlertService, private _route: ActivatedRoute,
   private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    if(this._route["url"]["_value"][0].path==="logout"){
        localStorage.setItem('email', "");
        this.sharedService.userSessionUpdateExecute(null);
    }
    // this._route.url.subscribe( res => {
    //   if ( res[0].path === "logout" ){
    //}
    //});
  }
  login() {
    this.loading = true;
this.userService.authenticate(this.model).subscribe(token=>{
  localStorage.setItem("JWT_TOKEN",token);
},
error=>{
  console.log("login failed data token not found");
  this.displaymessage="lohin Failure";
    this.loading = true;
});
    this.userService.validate(this.model)
        .subscribe(
            data => {
              console.log("login sucess data:"+data);
              localStorage.setItem('email', data.email);
              this.sharedService.userSessionUpdateExecute(data);
              this.loading=false;
              this.message=true;
              this.displaymessage="Login successful";
              this.router.navigate(['/home']);
          },
          error => {
            console.log("login failed data");
            this.displaymessage="lohin Failure";
              this.loading = true;
          });
  }
}
