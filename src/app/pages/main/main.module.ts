import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import {BuyPackageDialogAnimations} from "../../shared/dialog/dialog.component";
import {PriceFormatPipe} from "../../shared/pipe/price-format.pipe";
import {MatDivider} from "@angular/material/divider";

@NgModule({
  declarations: [
    MainComponent,
    PriceFormatPipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    MatButtonModule,
    BuyPackageDialogAnimations,
    MatDivider
  ],
  exports: [
    PriceFormatPipe
  ]
})
export class MainModule { }
