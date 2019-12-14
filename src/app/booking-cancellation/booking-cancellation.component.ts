import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CancelFilter } from '../models/CancelFilter';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-booking-cancellation',
  templateUrl: './booking-cancellation.component.html',
  styleUrls: ['./booking-cancellation.component.scss']
})
export class BookingCancellationComponent implements OnInit {


  reservation:any[]=[];
  constructor(private userService: UserService) { }

  ngOnInit() {
  }


  cancelledBookings(date1:any,date2:any){
    this.userService.cancelledBookings(date1.value,date2.value).subscribe(data=>{
      console.log("success cancelled bookings");
      this.reservation=data;
    }),
    error=>{
  console.log("error"+error)
};

}



}
