import { UserService } from '../services/user.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose, MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {Component, EventEmitter, Inject, Output} from "@angular/core";
import {User} from "../models/User";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {NgIf} from "@angular/common";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";

@Component({
  selector: 'dialog-animations-delete-dialog',
  templateUrl: 'dialog-delete-user.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, RouterLink],
})
export class DeleteUserAnimationsDialog {
  uid?: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {uid: string},
    private userService: UserService,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.uid = data.uid;
  }

  deleteUser() {
    if (this.uid) {
      this.userService.delete(this.uid).then(() => {
        this.afAuth.currentUser.then(user => {
          if (user) {
            user.delete().then(() => {
              this.authService.logout().then(() => {
                localStorage.setItem('user', 'null' as string);
              });
            }).catch(error => {
              console.error('Error deleting user from Firebase Authentication', error);
            });
          }
        });
      }, error => {
        console.error('Error deleting user from database', error);
      });
    }
  }
}

@Component({
  selector: 'dialog-animations-delete-dialog',
  templateUrl: 'dialog-delete-package.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, RouterLink],
})
export class DeletePackageAnimationsDialog {
  uid?: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {uid: string},
    private userService: UserService,
    private router: Router,
    private _snackbar: SnackBarComponent
  ) {
    this.uid = data.uid;
  }

  deletePackage() {
    if (this.uid) {
      this.userService.deletePackage(this.uid).then(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/account']);
          this._snackbar.openSnackBar('Mobilcsomag sikeresen törölve!', 'Rendben');
        });
      });
    }
  }
}

@Component({
  selector: 'dialog-delete',
  styleUrl: 'dialog.component.scss',
  templateUrl: 'dialog-delete.component.html',
  standalone: true,
  imports: [MatButtonModule, NgIf, RouterLink],
})
export class DeleteDialogAnimations {
  userPackage: any;
  @Output() delete = new EventEmitter<User>();


  constructor(public dialog: MatDialog, private userService: UserService) {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.userService.getUserPackage(user.uid).then(p => {
      this.userPackage = p;
    });
  }

  openDeleteUserDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const user = localStorage.getItem('user');
    const uid = JSON.parse(user as string).uid;
    if (uid) {
      this.dialog.open(DeleteUserAnimationsDialog, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: {uid}
      });
    }
  }

  openDeletePackageDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const user = localStorage.getItem('user');
    const uid = JSON.parse(user as string).uid;
    if (uid) {
      this.dialog.open(DeletePackageAnimationsDialog, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: {uid}
      });
    }
  }
}
