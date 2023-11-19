import { Component,AfterViewInit,ViewChild,OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ADMIN_API_BASE_URL } from 'config';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AddLocationComponent } from '../add-location/add-location.component';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit{
  location:string="";
  my_locations:any[]=[];
  authToken:String|null;
  constructor(private http:HttpClient,private dialog:MatDialog ){
    this.authToken=localStorage.getItem('authToken');
  }
  // }
  openDialog():void{
    const dialogRef = this.dialog.open(AddLocationComponent,{
   
      data:this.location
    })
    dialogRef.afterClosed().subscribe((result:string)=>{
      if (result){
        this.location=result
      }
  
    })
  }


  ngOnInit(){

    const headers =  new HttpHeaders({
      'Authorization':`Bearer ${this.authToken}`
     })
     console.log(this.authToken)
     
  this.http.get(`${ADMIN_API_BASE_URL}`+'/get_all_location',{headers:headers}).subscribe((response:any)=>{
    if (response.status){
      this.my_locations=response.message;
    }else{
      this.my_locations=[
        {_id:1,location_name:"A"},
        {_id:2,location_name:"B"},
        {_id:1,location_name:"A"},
        {_id:2,location_name:"B"},
        {_id:1,location_name:"A"},
        {_id:2,location_name:"B"},
        {_id:1,location_name:"A"},
        {_id:2,location_name:"B"},
        {_id:1,location_name:"A"},
        {_id:2,location_name:"B"},
      ]
    }

  })
}

}
