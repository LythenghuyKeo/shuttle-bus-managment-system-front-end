import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  password:string ="";
  showPassword:boolean=false;
  passwordInputtype:string='password';
  title = 'Bus-Management-System';
  constructor (private router:Router){}
  toRegister(){
    this.router.navigate(['/register'])
  }
  toLogIn(){
    this.router.navigate(['/login'])
  }
  handlePassword(){
       this.showPassword=!this.showPassword;
       this.passwordInputtype=this.showPassword?'text':'password';
  }

}
