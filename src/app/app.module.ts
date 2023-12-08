import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormsModule } from '@angular/forms';
import  {  BrowserAnimationsModule  }  from  '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { BookingInfoComponent } from './booking-info/booking-info.component';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CalendarModule } from 'primeng/calendar';
import { AlertComponent } from './alert/alert.component';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AdminComponent } from './admin/admin.component';
import { LocationComponent } from './location/location.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddLocationComponent } from './add-location/add-location.component';
import { ApprovalPageComponent } from './approval-page/approval-page.component';
import { AssignDriverComponent } from './assign-driver/assign-driver.component';
import { ApprovalComponent } from './approval/approval.component';
import { EditLocationComponent } from './edit-location/edit-location.component';
import { EditDriverComponent } from './edit-driver/edit-driver.component';





@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainPageComponent,
    HistoryPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    BookingInfoComponent,
    AlertComponent,
    AdminComponent,
    LocationComponent,
    BookingInfoComponent,
    ApprovalComponent,
    AssignDriverComponent,
    EditDriverComponent

   
 




 



  
 
  ],
  imports: [
    EditProfileComponent,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    HttpClientModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    AddLocationComponent,
    BookingPageComponent,
    CalendarModule,
    MatDatepickerModule,
    ApprovalPageComponent,
    EditLocationComponent,
    




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
