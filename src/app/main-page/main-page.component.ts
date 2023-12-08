import { Component, Inject ,Input} from '@angular/core';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from 'config';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { BookingPageComponent } from '../booking-page/booking-page.component';
export interface Profile {
  id:string;
  name:string;
  department:string;
  batch:number;
  phone_number:string;
  role:string;
  remainingTickets:number;
  totalBooked:number;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})



export class MainPageComponent {

private authToken :string | null;

  myprofile:Profile={
    id:"",
    name:"",
    department:"",
    batch:10,
    phone_number:"",
    role:"",
    remainingTickets:0,
    totalBooked:0
  }

 constructor(public dialog:MatDialog,private router:Router,private http:HttpClient){this.authToken=localStorage.getItem('authToken')}
 openDialog():void{
  const dialogRef = this.dialog.open(EditProfileComponent,{
 
    data:{myprofile:this.myprofile}
  })
  dialogRef.afterClosed().subscribe((result:string)=>{
    if (result){
      this.myprofile.name=result
    }

  })

  

 }
 openAlertMessage(title:string,message:string):void{
  const data:any={
          title:title,
          message:message
  }
  this.dialog.open(AlertComponent,{
    width:'300px',
    data:data
  })
}
 openBooking():void{
  const dialogRef =this.dialog.open(BookingPageComponent,{
    width:'100%',
    height:'900px',
    data:{}
  })
  dialogRef.afterClosed().subscribe((result:string)=>{
    if(result){
      this.openAlertMessage("Successful","Booking Successful ! Please wait for approval !")

    }
  })
 }
 

  ngOnInit(){
    const headers =  new HttpHeaders({
      'Authorization':`Bearer ${this.authToken}`
     })
     console.log(this.authToken)
     
  this.http.get(`${API_BASE_URL}`+'/view_profile',{headers:headers}).subscribe((response:any)=>{
    if (response.status){
      this.myprofile=response.user
    }
    else{
      this.router.navigate(['/login'])
    }

  
  })
}

//  openBooking():void{
//   const dialogRef=this.dialog.
//  }
  

 

 }
// interface Profile {
//   id:string;
//   name:string;
//   department:string;
//   batch:number;
//   phone_number:string;
//   role:string;
//   remainingTickets:number;
//   totalBooked:number;
// }
// const myprofile:Profile={
//   id:"0842824329840",
//   name:"Tae Yun",
//   department:"Software Engineering",
//   batch:10,
//   phone_number:"+1 008230 934",
//   role:"user",
//   remainingTickets:34,
//   totalBooked:23
// }
