import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from 'config';
import { MatDialog } from '@angular/material/dialog';
import { response } from 'express';
import { BookingInfoComponent } from '../booking-info/booking-info.component';
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent {
  myTicket:any;
  bookedId:string=''
  authToken:string|null;
  myhistory:any[]=[]
  constructor(public http:HttpClient,public dialog:MatDialog){{this.authToken=localStorage.getItem('authToken')}}
  onTicketOpen(mybooking:any):void{
    this.dialog.open(BookingInfoComponent,{
      width:'400px',
      data:mybooking
    })
  }
  // onTicketOpen(bookedId:string):void{
  //   const headers =  new HttpHeaders({
  //     'Authorization':`Bearer ${this.authToken}`,
  //     'bookedId':bookedId
  //    })
  //    this.http.get(`${API_BASE_URL}`+'/view_booking',{headers:headers}).subscribe((response:any)=>{
  //      if (response.status){
  //        this.myTicket=response.message
  //        const dialogRef = this.dialog.open(EditProfileComponent,{
 
  //         data:{myticket:this.myTicket}
  //       })
  //       dialogRef.afterClosed().subscribe((result:string)=>{
  //         if (result){
  //           this.myprofile.name=result
  //         }
      
  //       })
         
  //      }else{
  //       this.myTicket={"message":"No data"}
  //      }
  //    })
  // }
  ngOnInit(){

    const headers =  new HttpHeaders({
      'Authorization':`Bearer ${this.authToken}`
     })
     console.log(this.authToken)
     
  this.http.get(`${API_BASE_URL}`+'/get_booking',{headers:headers}).subscribe((response:any)=>{
    if (response.status){
      this.myhistory=response.message;
      console.log(this.myhistory)
    }else{
      this.myhistory=[
        {_id:1,location_name:"A"},
        {_id:2,location_name:"B"},
        {_id:1,location_name:"A"},
        {_id:2,location_name:"B"},
        {_id:1,location_name:"A"},
        {_id:2,location_name:"B"},
        {_id:1,location_name:"A"},
        {_id:2,location_name:"B"},
        {_id:1,location_name:"A"},
        {_id:2,location_name:"B"},
      ]
    }

  })
}
}
