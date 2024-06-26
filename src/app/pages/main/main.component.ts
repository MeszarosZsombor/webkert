import {Component, OnInit} from '@angular/core';
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
export class MainComponent implements OnInit {
  packages?: Observable<Package[]>;

  constructor(private packageService: PackageService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.packages = this.packageService.getAllOrderByPrice()
  }


  buyPackage(phonePackage: Package) {
    this.dialog.open(BuyPackageDialogAnimationsDialog, {
      data: { phonePackage: phonePackage }
    });
  }
}
