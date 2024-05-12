import { UserService } from '../services/user.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose, MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {Component, EventEmitter, Inject, Input, Output} from "@angular/core";
import {User} from "../models/User";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Bonuses} from "../models/Bonuses";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'dialog-animations-delete-dialog',
  templateUrl: 'dialog-buy-bonuses.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, RouterLink],
})
export class BuyBonusesAnimationsDialog {
  uid?: string;
  selectedBonuses: Bonuses[] = [];
  constructor(
    public dialogRef: MatDialogRef<BuyBonusesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {uid: string, selectedBonuses: Bonuses[]},
    private userService: UserService,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.uid = data.uid;
    this.selectedBonuses = data.selectedBonuses;
  }

  buyBonuses(selectedBonuses: Bonuses[]) {
    this.userService.buyBonuses(this.uid as string, selectedBonuses);
  }
}

@Component({
  selector: 'dialog-buy-bonuses',
  styleUrl: 'dialog.component.scss',
  templateUrl: 'dialog-buy-bonuses.component.html',
  standalone: true,
  imports: [MatButtonModule],
})
export class BuyBonusesDialog {
  @Input() selection?: SelectionModel<Bonuses>;
  @Input() selectedBonuses: Bonuses[] = [];

  constructor(public dialog: MatDialog) {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const user = localStorage.getItem('user');
    const uid = JSON.parse(user as string).uid;
    if (!this.selection) {
      this.selection = new SelectionModel<Bonuses>(true, []);
    }
    console.log('selection: ', this.selectedBonuses);
    this.dialog.open(BuyBonusesAnimationsDialog, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: {
          uid,
          selectedBonuses: this.selectedBonuses
        }
    });
  }
}
