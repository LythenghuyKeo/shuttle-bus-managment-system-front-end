import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from 'config';
import { Router,CanActivateChildFn} from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn:'root'
})
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  isAuth:boolean=false;
  constructor(private http:HttpClient,private router:Router, private dialog:MatDialog ){

  }
  password:string ="";
  isShowPassword:boolean=false;
  passwordInputtype:string='password';
  handlePassword(){
    this.isShowPassword=!this.isShowPassword;
    this.passwordInputtype=this.isShowPassword?'text':'password';
}User:{email:string,password:string}={
  email:'',
  password:'',

};
onEmailInputChange(email:string):void{
  this.User.email=email
}
onPasswordInputChange(password:string):void{
  this.User.password=password
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
onLogIn(event:Event){
  event.preventDefault();
  this.http.post(`${API_BASE_URL}`+"/login",this.User).subscribe((response:any)=>{
    if (response.status){
      localStorage.setItem('role',response.role)
      localStorage.setItem('authToken',response.token)
      this.openAlertMessage('Authentication Successful',response.message)
      console.log(response.role)
      if(response.role==='user'){
        this.router.navigate(['home'])
      }
      else if (response.role==='admin'){
        this.router.navigate(['admin'])
      }
    
    }else{
      this.openAlertMessage('Authentication Failed',response.message)

      
    }
  }
  // console.log('User Registered',response),
  // if(){

  // }

 
  )

  
}

}
