import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
  }
  canActivate(){

    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('user') as string);
      if (user) {
        return true;
      } else {
        this.router.navigate(['/main']);
        return false;
      }
    }
    return false;
  }

}
