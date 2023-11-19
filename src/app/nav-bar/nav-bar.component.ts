import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from 'config';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  headers:any;
  authToken:string|null;
  isLoggedIn:boolean;
 constructor(private http:HttpClient , private router:Router,private authService:AuthService){
   this.isLoggedIn=this.authService.isLoggedIn(),
   this.authToken=localStorage.getItem('authToken');
 }
 ngOnInit(){
  this.headers =  new HttpHeaders({
   'Authorization':`Bearer ${this.authToken}`
  })
 
 }
 onLogOut(){
  this.http.post(`${API_BASE_URL}`+"/logout",{},{headers:this.headers}).subscribe((response:any)=>{
    console.log(response.status,response.message)
    if (response.status){
      localStorage.setItem('authToken',"")

          this.router.navigate([''])
    }else{
       console.log(this.headers)
      
    }
  })
 }

 

}
