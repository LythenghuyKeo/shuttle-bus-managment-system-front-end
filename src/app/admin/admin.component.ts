import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
 
  constructor(private router:Router){}
  toLocation(){
    this.router.navigate(['admin/location'])
  }
  toApproval(){
    this.router.navigate(['admin/history'])
  }
  toDriver(){
    this.router.navigate(['admin/assign_driver'])
  }

}
