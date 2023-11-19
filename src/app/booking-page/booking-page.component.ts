import { Component,Inject } from '@angular/core';
import { API_BASE_URL } from 'config';
import { MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css'],
  standalone:true,
  imports:[
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    NgIf,
    NgFor
  ],
})
export class BookingPageComponent {
  // const pickUpLocation = req.body.pickUpLocation
  //   const pickUpDateTime = req.body.pickUpDateTime
  //   const destinationLocation= req.body.destinationLocation
  //   const destinationDateTime = req.body.destinationDateTime
  mybooking:{pickUpLocation:string,pickUpDateTime:string,destinationLocation:string,destinationDateTime:string}={
    pickUpLocation:'',pickUpDateTime:'',destinationDateTime:'',destinationLocation:''


  }
  mylocation:any[]=[];
  headers:any;
  authToken:string|null;
  constructor (public dialogRef:MatDialogRef<BookingPageComponent>,@Inject(MAT_DIALOG_DATA) data:any ,private http:HttpClient){
    this.authToken=localStorage.getItem('authToken')
  }
   
  onCancelClick():void{
    this.dialogRef.close();
  }
  onOkClick():void{
    this.http.post(`${API_BASE_URL}`+'/create_booking',this.mybooking,{headers:this.headers}).subscribe((response:any)=>{
      if(response.status){
        this.dialogRef.close()
      }else{
        
      }
  
    
    })
  
  }
  onPickUpLocationInputChange(Location:string):void{
    this.mybooking.pickUpLocation=Location
  }
  onPickUpDateInputChange(Date:string):void{
    this.mybooking.pickUpDateTime=Date
  }
  ngOnInit(){
    this.headers =  new HttpHeaders({
     'Authorization':`Bearer ${this.authToken}`
    })
    this.http.get(`${API_BASE_URL}`+'/get_all_location',{headers:this.headers}).subscribe((response:any)=>{
      if(response.status){
         this.mylocation=response.message
         
      }else{
        alert(response.message)
      }
      console.log(response.message)
    })
   
   }
}
