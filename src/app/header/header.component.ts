import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { User } from '../models/user';
import {SharedService} from '../services/shared-service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  activeUser:User;
  isUserLogin:boolean=false;
  constructor(private userService:UserService, private zone:NgZone,private ref: ChangeDetectorRef,private router:Router ) {
    this.userService.getLoginEvent().subscribe(user=>{
      this.zone.run(() => {
      this.activeUser=user;
      this.isUserLogin=this.userService.isUserLoggedIn();
      this.ref.detectChanges();
      });
    });
 }

  ngOnInit() {
    console.log(this.isUserLogin);
    //    this.sharedService.userSessionUpdateCall(temp);
  }
  logout()
  {
    sessionStorage.removeItem("JWT_TOKEN");
    this.userService.setLoginUser(undefined);
    this.router.navigateByUrl("login");
  }

}
