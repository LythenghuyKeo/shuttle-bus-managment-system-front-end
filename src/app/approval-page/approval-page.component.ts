import { Component,ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ADMIN_API_BASE_URL } from 'config';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { NgIf,NgForOf } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { BookingInfoComponent } from '../booking-info/booking-info.component';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-approval-page',
  templateUrl: './approval-page.component.html',
  standalone:true,
  imports:[
   MatDatepickerModule,
   MatNativeDateModule,
   MatFormFieldModule,
   MatInputModule,
   NgIf ,
   NgForOf ,

   
 ],  schemas: [
  CUSTOM_ELEMENTS_SCHEMA // Add CUSTOM_ELEMENTS_SCHEMA to suppress unknown element warnings
],
  styleUrls: ['./approval-page.component.css'],

})
export class ApprovalPageComponent {
  mydate:any;
  myTicket:any;
  bookedId:string=''
  authToken:string|null;
  myhistory:any[]=[]
  constructor(private router:Router,public dialog:MatDialog,public http:HttpClient,public c:ChangeDetectorRef){{this.authToken=localStorage.getItem('authToken')}}

  selectedDate: any; 
  toMain(){
      this.router.navigate(['admin'])
  }
  onSelectDate(date: any) {
    this.selectedDate = date.value; 
    
  }
  onTicketOpen(mybooking:any):void{
    this.dialog.open(BookingInfoComponent,{
      width:'450px',
      data:mybooking
    })
  }
  openAlertMessage(title:string,message:string):void{
    const data:any={
            title:title,
            message:message
    }
    this.dialog.open(AlertComponent,{
      width:'400px',
      data:data
    })
  }
  onApprove(bookedId:string):void{
    console.log(this.selectedDate)
    const headers =  new HttpHeaders({
      'Authorization':`Bearer ${this.authToken}`
     })
     console.log(this.authToken)
     
  this.http.put(`${ADMIN_API_BASE_URL}`+'/accept_booking',{bookedId:bookedId},{headers:headers}).subscribe((response:any)=>{
    if (response.status){
      setTimeout(() => {
        this.openAlertMessage('Status',response.message)// Assign fetched data
        this.c.detectChanges();
      }, 1000);
      this.c.detectChanges();
      }else{
        setTimeout(() => {
          this.openAlertMessage('Status',response.message)// Assign fetched data
          location.reload()
        }, 1000);
        this.c.detectChanges();
       }

  })
}
onReject(bookedId:string):void{
  console.log(this.selectedDate)
  const headers =  new HttpHeaders({
    'Authorization':`Bearer ${this.authToken}`
   })
   console.log(this.authToken)
   
this.http.put(`${ADMIN_API_BASE_URL}`+'/reject_booking',{bookedId:bookedId},{headers:headers}).subscribe((response:any)=>{
  if (response.status){
    setTimeout(() => {
      this.openAlertMessage('Status',response.message)// Assign fetched data
      location.reload();
    }, 1000);

 }else{
  setTimeout(() => {
    this.openAlertMessage('Status',response.message)// Assign fetched data
  }, 1000);
  
 }

})
}
  onOk():void{
    console.log(this.selectedDate)
    const headers =  new HttpHeaders({
      'Authorization':`Bearer ${this.authToken}`
     })
     console.log(this.authToken)
     
  this.http.post(`${ADMIN_API_BASE_URL}`+'/get_all_booking',{pickUpDate:this.selectedDate},{headers:headers}).subscribe((response:any)=>{
    if (response.status){
      setTimeout(() => {
        this.myhistory = response.message; // Assign fetched data
      }, 1000);
      this.c.detectChanges();
      console.log(this.myhistory)}

  })
}
}
