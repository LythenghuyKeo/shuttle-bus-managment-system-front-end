import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from 'config';
import { Router} from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  Departments:any[]=[
    {id:1,value:'Software Engineering'},
    {id:2,value:'Architecture'},
    {id:3,value:'Tourism Management'},
  ];
  Batch:string[]=[
    "9","10","11","12"
  ];
  constructor(private http:HttpClient,private router:Router, private dialog:MatDialog){}
  User:{email:string,password:string,name:string,department:string,batch:string}={
    email:'',
    password:'',
    name:'',
    department:'',
    batch:''
  };
  password:string ="";
  isShowPassword:boolean=false;
  passwordInputtype:string='password';
  onNameInputChange(newName:string):void{
    this.User.name=newName;
  }
  onEmailInputChange(email:string):void{
    this.User.email=email
  }
  onPasswordInputChange(password:string):void{
    this.User.password=password
  }
  onBatchInputChange(batch:string):void{
    this.User.batch=batch
  }
  onDepartmentInputChange(department:string):void{
    this.User.department=department
  }
  handlePassword(){
    this.isShowPassword=!this.isShowPassword;
    this.passwordInputtype=this.isShowPassword?'text':'password';
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
  onRegister(event:Event){
    console.log(this.User);
    event.preventDefault();
    this.http.post(`${API_BASE_URL}`+"/register",this.User).subscribe((response:any)=>{
      if (response.status){
        this.openAlertMessage('Successful Register',"Please Log In to Continue")
            this.router.navigate(['login'])
      }else{
        this.openAlertMessage('Authentication Failed',response.message)
        
      }
    }

   
    )
  
    
  }

}
