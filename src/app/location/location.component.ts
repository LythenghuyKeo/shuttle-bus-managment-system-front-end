import { Component,ChangeDetectionStrategy,OnInit,ChangeDetectorRef,NgZone  } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ADMIN_API_BASE_URL } from 'config';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AlertComponent } from '../alert/alert.component';
import { EditLocationComponent } from '../edit-location/edit-location.component';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit{
  location:string="";
  my_locations:any[]=[];
  authToken:String|null;
  constructor(public cdr:ChangeDetectorRef,private router:Router,private http:HttpClient,private dialog:MatDialog ){
    this.authToken=localStorage.getItem('authToken');
  }
  // }
  openAlertMessage(title:string,message:string):void{
    const data:any={
            title:title,
            message:message
    }
    this.dialog.open(AlertComponent,{
      width:'400px',
      data:data
    })
  }
  openDialog():void{
    const dialogRef = this.dialog.open(AddLocationComponent,{
     width:"400px",
      data:this.location
    })
    dialogRef.afterClosed().subscribe((result:string)=>{
      if (result){
        this.location=result

      }
  
    })
  }
  toMain(){
    this.router.navigate(['admin'])
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
      ]
    }

  })

}
onDelete(locationId:string):void{
  const headers =  new HttpHeaders({
    'Authorization':`Bearer ${this.authToken}`
   })
  this.http.post(`${ADMIN_API_BASE_URL}`+'/delete_location',{locationId:locationId},{headers:headers}).subscribe((res:any)=>{
    if(res.status){
      setTimeout(() => {
        this.openAlertMessage('Status',res.message)// Assign fetched data
       location.reload()
      }, 1000);
    }else{
      this.openAlertMessage('Status',res.message)
    }
  });
  
}

openEditLocation(id:string,locationName:string):void{
  const dialogRef = this.dialog.open(EditLocationComponent,{
 
    data:{mylocation:{id:id,locationName:locationName}}
  })
  dialogRef.afterClosed().subscribe((result:string)=>{
    if (result){
       location.reload()
    }

  })

  

 }
}
