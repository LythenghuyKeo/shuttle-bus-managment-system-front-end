import { CanActivateFn,ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree, CanActivateChildFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
// export cons{
//   constructor(private authService:AuthService,private router:Router){}
//   canActivate(
//     next:ActivatedRouteSnapshot,
//     state:RouterStateSnapshot
//   ):boolean|UrlTree|Observable<boolean |UrlTree>|Promise<boolean|UrlTree>{
//       if (this.authService.isLoggedIn()){
//         return true
//       }else{
//         return this.router.parseUrl('/login')
//       }
//   }

// }
export const authGuard:CanActivateFn=(
  route:ActivatedRouteSnapshot,
  state:RouterStateSnapshot
):Observable<boolean | UrlTree>|Promise<boolean | UrlTree>|boolean|UrlTree=>{
  const requiredRole = route.data['requiredRole'];
  return (inject(AuthService).isLoggedIn()&&inject(AuthService).hasRole(requiredRole))?true:inject(Router).navigate(['/'])
  // return inject(AuthService).isLoggedIn()?true:true
}