import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from '../NgbdModalBasic';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent implements OnInit {

  pnrNo:String=undefined;
  passengers:any=[];
  bookedSeat:any=[]
  constructor(private userService:UserService,private modalService:NgbModal) {
    
  } 

  ngOnInit() {
  }
  searchPNR(){
    this.userService.passenger(this.pnrNo).subscribe(data=>{
      this.passengers=data['pessengers'];
      this.bookedSeat=data['seats'];
    })
  }
  checkIn(passenger){
    const modalRef = this.modalService.open(NgbdModalBasic);
    
    modalRef.componentInstance.passenger=passenger;
    modalRef.componentInstance.setbookedSeat(this.bookedSeat);
    modalRef.result.then((data) => {
      console.log('Model Closed....');
      this.searchPNR();
    });
  }
}
