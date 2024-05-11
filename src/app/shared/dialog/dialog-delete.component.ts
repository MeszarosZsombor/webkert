import { UserService } from '../services/user.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose, MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {Component, EventEmitter, Inject, Output} from "@angular/core";
import {User} from "../models/User";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'dialog-animations-delete-dialog',
  templateUrl: 'dialog-delete.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, RouterLink],
})
export class DeleteAnimationsDialog {
  uid?: string;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogAnimations>,
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
        console.log('User deleted successfully from database');
        this.afAuth.currentUser.then(user => {
          if (user) {
            user.delete().then(() => {
              console.log('User deleted successfully from Firebase Authentication');
              this.authService.logout();
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
  selector: 'dialog-delete',
  styleUrl: 'dialog.component.scss',
  templateUrl: 'dialog-delete.component.html',
  standalone: true,
  imports: [MatButtonModule],
})
export class DeleteDialogAnimations {
  @Output() delete = new EventEmitter<User>();

  constructor(public dialog: MatDialog) {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const user = localStorage.getItem('user');
    const uid = JSON.parse(user as string).uid;
    if (uid) {
      this.dialog.open(DeleteAnimationsDialog, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: {uid}
      });
    }
    console.log(uid);
  }
}
