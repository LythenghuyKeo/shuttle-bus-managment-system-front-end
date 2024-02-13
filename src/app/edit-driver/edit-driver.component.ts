import { Component ,Inject} from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgIf } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ADMIN_API_BASE_URL } from 'config';
import { LocationComponent } from '../location/location.component';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})
export class EditDriverComponent {
  headers:any;
  authToken:string|null;
  mydriver:any;
  name:string="";
  phoneNumber:string="";
  carPlate:string="";
  carType=""
  constructor (public dialogRef:MatDialogRef<LocationComponent>,@Inject(MAT_DIALOG_DATA) data:any ,private http:HttpClient){
       this.mydriver=data;
       this.authToken=localStorage.getItem('authToken')
    }
    ngOnInit(){
       this.headers =  new HttpHeaders({
        'Authorization':`Bearer ${this.authToken}`
       })
       
      }
    onCancelClick():void{
      this.dialogRef.close();
    }
    isError:boolean=false;
    message:string="";
    onOkClick(pickUpDate:any):void{
      this.http.put(`${ADMIN_API_BASE_URL}`+'/updateDriver',{pickUpDate:pickUpDate,name:this.name,phoneNumber:this.phoneNumber,carPlate:this.carPlate,carType:this.carType},{headers:this.headers}).subscribe((response:any)=>{
        if(response.status){


        }else{
          this.isError=true;
          this.message="Couldnt update try again"
        }
    
      
      })
    
    }
    onNameInputChange(newName:string):void{
      if (newName!=null){
        this.name=newName;
      }else{
        this.name=this.mydriver.name;
      }
    }
    onPhoneInputChange(newPhone:string):void{
      if (newPhone!=null){
        this.phoneNumber=newPhone;
      }else{
        this.phoneNumber=this.mydriver.phoneNumber;
      }
    }
    onCarTypeChange(carType:string):void{
      if (carType!=null){
        this.carType=carType;
      }else{
        this.carType=this.mydriver.carType;
      }
    }
    onCarPlateChange(carPlate:string):void{
      if (carPlate!=null){
        this.carPlate=carPlate;
      }else{
        this.carPlate=this.mydriver.carPlate;
      }

    }

}
