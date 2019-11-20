import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import {SharedService} from '../services/shared-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  activeUser:User;
  isActiveUserSessionExists = false;
  constructor(private _sharedService: SharedService) {

    _sharedService.userSessionUpdateCall$.subscribe(
     res => {
       /*  mobileNumber:  userName:   password: email: confirmPassword:*/
       if(res && res.email){
         console.log("res.email:"+res.email);
         this.isActiveUserSessionExists = true;
       }else{
         this.isActiveUserSessionExists = false;
       }
       this.activeUser  = res;
     });
 }

  ngOnInit() {

    //    this.sharedService.userSessionUpdateCall(temp);
  }


}
