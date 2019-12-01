import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthAdminGuard implements CanActivate {


  constructor(private _authService: UserService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isUserLoggedIn()&&this._authService.getLoginUser().role=='admin') {
        return true;
    }

    // navigate to login page
    this._router.navigateByUrl('login');
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}