/**
 * Created by sharm on 11/8/2017.
 */
import {Component, Input, SimpleChanges, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Select Seat</h4>
      <button type="button" class="close" aria-label="Close" (click)="close()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{passenger.firstName}} {{passenger.lastName}}</p>
      Seat No : 
      <select #seat> 
      <option *ngFor="let o of emyptSeat" value="{{o}}">
       {{type}} {{o}}
     </option>
      </select>
    </div>
    <div class="modal-footer">
    <p>{{msg}}</p>
    <button type="button" class="btn btn-primary postOpinion"  (click)="setSeat(seat.value)">Checkin</button>
     
    </div>
  `
})
export class NgbdModalBasic {
  
  emyptSeat:number[]=[];
  @Input()
   passenger: any;
   type:String;
   msg:String;
  constructor(private activeModal: NgbActiveModal,private router:Router,private userService:UserService) {

  }
  
  close(){
     this.activeModal.close('Close click');
  }
  setbookedSeat(bookedSeat:number[]){
    
    let totalSeat=0;
    if(this.passenger.reservation.type=='Economy'){
    totalSeat=this.passenger.reservation.flight.numseats;
    this.type='E';
    }
    else{
    totalSeat=this.passenger.reservation.flight.numseats;
    this.type='B';
    }
    for(let i=1;i<=totalSeat;i++){
      if(bookedSeat.indexOf(i)<0){
          this.emyptSeat.push(i);
      }
    }
  }
  setSeat(seatNo){
    let model:any={};
    model.seatNo=seatNo;
    model.type=this.passenger.reservation.type;
    model.flightId=this.passenger.reservation.flight.id;
    model.id=this.passenger.id;

    this.userService.setSeat(model).subscribe(data=>{
      this.msg=data.status;
    })
  }
  

}