import { Component ,Inject} from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgIf } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ADMIN_API_BASE_URL } from 'config';
import { LocationComponent } from '../location/location.component';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  standalone:true,
  imports:[
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf 
  ],
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent {
  headers:any;
  authToken:string|null;
  mylocation:any;
  location_name:string="";
  constructor (public dialogRef:MatDialogRef<LocationComponent>,@Inject(MAT_DIALOG_DATA) data:any ,private http:HttpClient){
       this.mylocation=data.mylocation;
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
    onOkClick(locationId:string):void{
      this.http.put(`${ADMIN_API_BASE_URL}`+'/update_location',{id:locationId,locationName:this.location_name},{headers:this.headers}).subscribe((response:any)=>{
        if(response.status){
          this.dialogRef.close(this.location_name)
        }
    
      
      })
    
    }
  

    onLocationInputChange(newName:string):void{
      this.location_name=newName;
    }
}
