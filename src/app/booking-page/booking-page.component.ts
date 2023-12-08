import { Component,Inject,ChangeDetectorRef} from '@angular/core';
import { API_BASE_URL } from 'config';
import { MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  mybooking:{pickUpLocation:string,pickUpDateTime:string,destinationLocation:string,destinationDateTime:string,pickUpTime:Number}={
    pickUpLocation:'',pickUpDateTime:'',destinationDateTime:'',destinationLocation:'',pickUpTime:0


  }
  time:number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  mylocation:any[]=[];
  headers:any;
  authToken:string|null;
  isError=false;
  message:string='';
  constructor (public cdr:ChangeDetectorRef,public router:Router,public dialogRef:MatDialogRef<BookingPageComponent>,@Inject(MAT_DIALOG_DATA) data:any ,private http:HttpClient){
    this.authToken=localStorage.getItem('authToken')
  }
   
  onCancelClick():void{
    this.dialogRef.close();
    this.cdr.detectChanges();
  }
   onOkClick():void{
    if (this.mybooking.destinationDateTime=='' || this.mybooking.destinationLocation=='' || this.mybooking.pickUpDateTime=='' || this.mybooking.pickUpLocation=='' || this.mybooking.pickUpTime==0  ){
      this.isError=true;
      this.message="Field can't be null !"
    }
    else{
    this.http.post(`${API_BASE_URL}`+'/create_booking',this.mybooking,{headers:this.headers}).subscribe((response:any)=>{
      if(response.status){
  
          setTimeout(() => {
            this.isError=false;
            this.message=response.message// Assign fetched data
          }, 1000);

       
        this.cdr.detectChanges()
      }else{
        this.isError=true;
        this.message=response.message

      }
  
    
    })
    }
  }
  onPickUpLocationInputChange(Location:string):void{
    this.mybooking.pickUpLocation=Location
  }
  onPickUpDateInputChange(Date:string):void{
    this.mybooking.pickUpDateTime=Date
  }
  onDestinationLocationInputChange(Location:string):void{
    this.mybooking.destinationLocation=Location
  }
  onDestinationDateInputChange(Date:string):void{
    this.mybooking.destinationDateTime=Date
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
