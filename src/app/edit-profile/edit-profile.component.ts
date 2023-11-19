import { Component ,Inject} from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgIf } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from 'config';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  standalone:true,
  imports:[
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf 
  ],
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  headers:any;
  authToken:string|null;
    myprofile:any;
    name:string="";
    constructor (public dialogRef:MatDialogRef<EditProfileComponent>,@Inject(MAT_DIALOG_DATA) data:any ,private http:HttpClient){
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
      this.http.put(`${API_BASE_URL}`+'/update_profile',{name:this.name},{headers:this.headers}).subscribe((response:any)=>{
        if(response.status){
          this.dialogRef.close(this.name)
        }
    
      
      })
    
    }
  

    onNameInputChange(newName:string):void{
      this.name=newName;
    }
    onFileSelected(event:any):void{
         
    }
}
