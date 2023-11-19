import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent {
//   myhistory:any[]=[]
//   ngOnInit(){

//     const headers =  new HttpHeaders({
//       'Authorization':`Bearer ${this.authToken}`
//      })
//      console.log(this.authToken)
     
//   this.http.get(`${ADMIN_API_BASE_URL}`+'/get_all_location',{headers:headers}).subscribe((response:any)=>{
//     if (response.status){
//       this.my_locations=response.message;
//     }else{
//       this.my_locations=[
//         {_id:1,location_name:"A"},
//         {_id:2,location_name:"B"},
//         {_id:1,location_name:"A"},
//         {_id:2,location_name:"B"},
//         {_id:1,location_name:"A"},
//         {_id:2,location_name:"B"},
//         {_id:1,location_name:"A"},
//         {_id:2,location_name:"B"},
//         {_id:1,location_name:"A"},
//         {_id:2,location_name:"B"},
//       ]
//     }

//   })
}
