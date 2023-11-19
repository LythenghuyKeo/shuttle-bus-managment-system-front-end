import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole:string|null;
  constructor() {
    this.userRole = localStorage.getItem('role')
   }
   hasRole(requiredRole:string|null):boolean{
    return this.userRole===requiredRole;
   }
  isLoggedIn(){
    const token=localStorage.getItem('authToken');
    const payload = atob(token!.split(".")[1])
    console.log(token)
    if (payload == null){
        return false
    }else{
      const parsedPayload = JSON.parse(payload)

      return parsedPayload.exp > Date.now()/1000;

    }
  }
}
