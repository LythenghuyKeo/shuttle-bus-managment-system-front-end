import { Component ,Inject} from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgIf } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ADMIN_API_BASE_URL } from 'config';
@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  standalone:true,
   imports:[
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf 
  ],
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent {
  headers:any;
  authToken:string|null;
    myprofile:any;
    name:string="";
    constructor (public dialogRef:MatDialogRef<AddLocationComponent>,@Inject(MAT_DIALOG_DATA) data:any ,private http:HttpClient){
       this.myprofile=data.myprofile;
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
    onOkClick():void{
      this.http.post(`${ADMIN_API_BASE_URL}`+'/create_location',{location_name:this.name},{headers:this.headers}).subscribe((response:any)=>{
        console.log(this.name)
        if(response.status){
          this.dialogRef.close(this.name)
        }
    
      
      })
    
    }
  

    onLocationInputChange(newName:string):void{
      this.name=newName;
    }

}
