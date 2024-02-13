import { Component,ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA ,Inject} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog ,MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { ADMIN_API_BASE_URL } from 'config';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { NgIf,NgForOf } from '@angular/common';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AlertComponent } from '../alert/alert.component';
import { BookingInfoComponent } from '../booking-info/booking-info.component';
import { EditDriverComponent } from '../edit-driver/edit-driver.component';
@Component({
  selector: 'app-assign-driver',
  templateUrl: './assign-driver.component.html',
  styleUrls: ['./assign-driver.component.css']
})
export class AssignDriverComponent {
  name:string="";
  phoneNumber:string="";
  carPlate:string="";
  carType:string="";
  unAssignedDriverDates:any;
  unAssignedDriverDate:any;
  assignedDriver:any;
  headers:any;
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
  onAddDriver():void{
    if (this.name!="" &&this.carPlate!="" && this.carType!="" && this.phoneNumber!=""){
    this.http.post(`${ ADMIN_API_BASE_URL}`+'/addDriver',{pickUpDate:this.unAssignedDriverDate,name:this.name,carType:this.carType,carPlate:this.carPlate,phoneNumber:this.phoneNumber},{headers:this.headers}).subscribe((response:any)=>{
      if(response.status){
        this.openAlertMessage("Status",response.message)
        location.reload()
         
      }else{
        this.openAlertMessage("Status",response.message)
      }
      console.log(response.message)
    })
  }else{
    this.openAlertMessage("Error","Fields can't be null !")
  }
}
  ngOnInit(){
    this.headers =  new HttpHeaders({
     'Authorization':`Bearer ${this.authToken}`
    })
    this.http.get(`${ ADMIN_API_BASE_URL}`+'/getUnAssignedDriver',{headers:this.headers}).subscribe((response:any)=>{
      if(response.status){
         this.unAssignedDriverDates=response.message
         
      }else{
        this.unAssignedDriverDates=[];
      }
      console.log(response.message)
    })
    this.http.get(`${ ADMIN_API_BASE_URL}`+'/getAssignedDriver',{headers:this.headers}).subscribe((response:any)=>{
      if(response.status){
         this.assignedDriver=response.message
         
      }else{
        this.assignedDriver=[];
      }
      console.log(response.message)
    })
   
   }






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
onEditDriver(date:any):void{
  console.log(this.selectedDate)
  const headers =  new HttpHeaders({
    'Authorization':`Bearer ${this.authToken}`
   })
   console.log(this.authToken)
   
   this.http.put(`${ADMIN_API_BASE_URL}`+'/updateDriver',{pickUpDate:date,name:"",phoneNumber:"",carPlate:"",carType:""},{headers:this.headers}).subscribe((response:any)=>{
    if(response.status){
        location.reload()

    }

  
  })
}
}
