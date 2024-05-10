import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('user') as string);
      if (user) {
        return true;
      }
    }
    return false;
  }

}
