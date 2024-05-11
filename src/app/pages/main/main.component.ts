import { Component } from '@angular/core';
import {Package} from "../../shared/models/Package";
import {PackageService} from "../../shared/services/package.service";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {BuyPackageDialogAnimationsDialog} from "../../shared/dialog/dialog.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  packages?: Observable<Package[]>;
  selectedPackage?: Package;

  constructor(private packageService: PackageService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.packages = this.packageService.getAll()
  }

  selectPackage(phonePackage: Package) {
    this.selectedPackage = phonePackage;
  }

  buyPackage(phonePackage: Package) {
    const dialogRef = this.dialog.open(BuyPackageDialogAnimationsDialog, {
      data: { phonePackage: phonePackage }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
