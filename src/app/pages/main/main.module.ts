import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {MatCard, MatCardModule, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {DialogAnimationsExample} from "../../shared/dialog/dialog.component";


@NgModule({
  declarations: [
    MainComponent
  ],
    imports: [
        CommonModule,
        MainRoutingModule,
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatCardActions,
        MatCardModule,
        MatButton,
        DialogAnimationsExample
    ]
})
export class MainModule { }
