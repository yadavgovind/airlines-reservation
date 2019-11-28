import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit {
 
  reservation: any[] = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getReservationDetail();
  }

  getReservationDetail(){
    this.userService.getReserVationDeatils().subscribe(data=> {
     this.reservation=data;
     console.log(this.reservation+"ccccccccccccccccccccccccccccccc")
    },
    error=>{
      console.error("error")
  })
    
  }

  cancelClick(reservationId:number){
    alert(reservationId+"");
    this.userService.cancelReservation(reservationId).subscribe(reser=>{
      console.log("success");
    },
    error=>{
console.error("error");
    });
  }
}
