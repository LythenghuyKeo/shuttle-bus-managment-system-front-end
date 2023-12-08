import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';
import { authGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { LocationComponent } from './location/location.component';
import { ApprovalComponent } from './approval/approval.component';
import { AssignDriverComponent } from './assign-driver/assign-driver.component';
const routes: Routes = [
  {path:"",component:LoginPageComponent},
  {path:'home',component:MainPageComponent,canActivate:[authGuard],data:{requiredRole:'user'}},
  {path:'register',component:RegisterPageComponent},
  {path:'login',component:LoginPageComponent},
  {path:'admin',component:AdminComponent,canActivate:[authGuard],data:{requiredRole:'admin'}},
  {path:'admin/location',component:LocationComponent,canActivate:[authGuard],data:{requiredRole:'admin'}},
  {path:'admin/history',component:ApprovalComponent,canActivate:[authGuard],data:{requiredRole:'admin'}},
  {path:'admin/assign_driver',component:AssignDriverComponent,canActivate:[authGuard],data:{requiredRole:'admin'}},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }
