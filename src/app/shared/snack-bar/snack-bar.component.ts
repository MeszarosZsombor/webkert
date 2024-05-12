import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Snack-bar with a custom component
 */
@Component({
  selector: 'snack-bar-component',
  template: ``,
  standalone: true,
  imports: [MatButtonModule],
})
export class SnackBarComponent {
  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
