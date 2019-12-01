import { Component, ElementRef } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'flight-demo-project';
  constructor(
private elementRef:ElementRef,private userService:UserService,private router:Router
  ){
    if(sessionStorage.getItem("JWT_TOKEN")!=undefined){
      this.userService.me().subscribe(user=>{
        this.userService.setLoginUser(user);
        if(user.role=='user')
          this.router.navigateByUrl('home');
        else
         this.router.navigateByUrl('adminhome');
      })
    }
    else this.router.navigateByUrl('login');
  }

  ngAfterViewInit(){
    var style=document.createElement('link');
    style.type="text/css";
    style.href='./assets/css/style.css';
    style.rel="stylesheet";
    this.elementRef.nativeElement.appendChild(style);

  }
}
