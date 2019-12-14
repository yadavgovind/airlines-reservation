import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CancelFilter } from '../models/CancelFilter';

@Component({
  selector: 'app-booking-cancellation',
  templateUrl: './booking-cancellation.component.html',
  styleUrls: ['./booking-cancellation.component.scss']
})
export class BookingCancellationComponent implements OnInit {


cancelFilter = new CancelFilter() ;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }


  cancelledBookings(){
    this.userService.cancelledBookings().subscribe(data=>{
      console.log("success cancelled bookings")
    }),
    error=>{
  console.log("error"+error)
};}



}
