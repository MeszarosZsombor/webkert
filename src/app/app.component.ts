import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {Router, NavigationEnd} from "@angular/router";
import {filter} from "rxjs";
import {AuthService} from "./shared/services/auth.service";
import {extractRoutes} from "@angular-devkit/build-angular/src/utils/routes-extractor/extractor";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'webkert';
  page = 'main';
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router, private authService: AuthService) {
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      }
    }, error => {
      console.error(error);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('user', JSON.stringify('null'));
      }
    });
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

  logout(_?: boolean) {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login');
      localStorage.removeItem('user');
    }).catch(err => {
      console.error(err);
    });
  }
}
