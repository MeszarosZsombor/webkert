import { Component } from '@angular/core';
import {Package} from "../../shared/models/Package";
import {PackageService} from "../../shared/services/package.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  packages: Package[] = [];

  constructor(private packageService: PackageService) {
  }

  ngOnInit() {
    this.packageService.getAll();
    this.packages = this.packageService.packages;
  }

  buyPackage(phonePackage: Package) {

  }
}
