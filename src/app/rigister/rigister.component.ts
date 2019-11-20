import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-rigister',
  templateUrl: './rigister.component.html',
  styleUrls: ['./rigister.component.scss']
})
export class RigisterComponent implements OnInit {
  [x: string]: any;
  model: any = {};
  message = false;
  loading = true;
  displaymessage:string

  constructor(
   private userService: UserService,
   private alertService:AlertService,
   private router: Router
    ) { }

  ngOnInit() {
  }
  register() {
    this.loading = true;
    this.userService.create(this.model)
        .subscribe(
            data => {
              this.loading=false;
              this.message=true;
              this.displaymessage="Rigistration successful";
              this.router.navigate(['/login']);
          },
          error => {
            this.displaymessage="Rigistration Failure"
              this.loading = true;
          });
}

}
