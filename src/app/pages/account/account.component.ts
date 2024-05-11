import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import {AuthService} from "../../shared/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {PackageService} from "../../shared/services/package.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy{

  user?: User;
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService,
              private authService: AuthService,
              public dialog: MatDialog,
              private packageService: PackageService) { }

  ngOnInit() {
    const subscription = this.authService.isUserLoggedIn().subscribe(user => {
      if (user) {
        const userSubscription = this.userService.getById(user.uid).subscribe(user => {
          this.user = user;
          if (user?.package) {
             const packageSubscription= this.packageService.getById(user.package).subscribe(p => {
              if (this.user && p) {
                this.user.package = p.title;
              }
            });
            this.subscriptions.push(packageSubscription);
          }
        });
        this.subscriptions.push(userSubscription);
      }
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
