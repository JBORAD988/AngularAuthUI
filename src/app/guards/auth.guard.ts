import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {NgToastService} from "ng-angular-popup";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService , private router : Router, private toast : NgToastService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.auth.isloggedIn()) {
      // this.router.parseUrl('/dashboard');
      return true;
    } else {
     this.toast.error({detail:"Error", summary:"Please Login First" , duration: 5000})
      return this.router.parseUrl('/login');

    }
  }
}
