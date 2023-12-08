import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { API_BASE_URL } from 'config';
import { Router,CanActivateChildFn} from '@angular/router';

@Component({
  selector: 'app-booking-info',
  templateUrl: './booking-info.component.html',
  styleUrls: ['./booking-info.component.css']
})
export class BookingInfoComponent {
  isError:boolean=false;
  message:string='';
  headers:any;
  authToken:string|null;
  constructor(
    public http:HttpClient,
    public router:Router,
    public dialogRef: MatDialogRef<BookingInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){
   
    this.authToken=localStorage.getItem('authToken')
  }

  closeDialog():void{
    this.dialogRef.close()
  }
  ngOnInit(){
    this.headers =  new HttpHeaders({
     'Authorization':`Bearer ${this.authToken}`,
    })
   
   }
  onOkClick(bookedId:string):void{
    this.http.put(`${API_BASE_URL}`+'/cancel_booking',{bookedId:bookedId},{headers:this.headers}).subscribe((response:any)=>{
      console.log(bookedId)
      if(response.status){
        this.isError=false;
        this.dialogRef.close()
        // this.router.navigate(['home'])
      }else{
        this.isError=true;
        this.message=response.message;
      }
  
    
    })
  
  }
}
