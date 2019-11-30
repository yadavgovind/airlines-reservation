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
    model: any = {'agree':'','username':'', 'password':''};
    message = false;
    loading = true;
    displaymessage:string
  constructor(
   private userService: UserService,
   private alertService:AlertService, private _route: ActivatedRoute,
   private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    
  }
  login() {
    this.loading = true;
    this.userService.authenticate(this.model).subscribe(token=>{
      sessionStorage.setItem("JWT_TOKEN",'Bearer '+token.token);
      this.userService.me().subscribe(user=>{
        this.userService.setLoginUser(user);
        if(user.role=='user')
        this.router.navigateByUrl('home');
        else
        this.router.navigateByUrl('adminhome');
      })
    },
    error=>{
      console.log("login failed data token not found"); 
      this.displaymessage="Username Password Incorrect";
        this.loading = true;
    });
   
  }
}
