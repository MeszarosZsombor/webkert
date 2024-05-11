import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent, MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {Package} from "../models/Package";
import {RouterLink} from "@angular/router";
import {UserService} from "../services/user.service";

/**
 * @title Dialog Animations
 */
@Component({
  selector: 'dialog-animations',
  styleUrl: 'dialog.component.scss',
  templateUrl: 'dialog.component.html',
  standalone: true,
  imports: [MatButtonModule],
})
export class BuyPackageDialogAnimations {
  @Input() phonePackage?: Package;
  @Output() buy = new EventEmitter<Package>();
  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if(user){
    this.dialog.open(BuyPackageDialogAnimationsDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {phonePackage: this.phonePackage}
    });
    }else{
      this.dialog.open(LoginDialog, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration
      });
      }
    }
}

export interface DialogData {
  phonePackage: Package;
}

@Component({
  selector: 'dialog-animations-buy-package-dialog',
  templateUrl: 'dialog-buy-package.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, RouterLink],
})
export class BuyPackageDialogAnimationsDialog {
  phonePackage?: Package;
  constructor(public dialogRef: MatDialogRef<BuyPackageDialogAnimationsDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private userService: UserService){
    this.phonePackage = data.phonePackage;
  }

  buyPackage(phonePackage: Package) {
    console.log(phonePackage.id);
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (user) {
      this.userService.addPackageToUser(user.uid, phonePackage.id).then(() => {
        console.log('Package added to user successfully');
      }).catch(error => {
        console.error('Error adding package to user', error);
      });
    }
  }
}

@Component({
  selector: 'dialog-animations-login',
  templateUrl: 'dialog-login.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, RouterLink],
})
export class LoginDialog {
  constructor(public dialogRef: MatDialogRef<LoginDialog>){
  }
}
