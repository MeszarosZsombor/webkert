import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {DeleteDialogAnimations} from "../../shared/dialog/dialog-delete.component";
import { BonusesComponent } from './bonuses/bonuses.component';
import {TableStickyFooterExample} from "../../shared/table/table.component";
import {BuyBonusesDialog} from "../../shared/dialog/dialog-buy-bonuses.component";
import {MatDivider} from "@angular/material/divider";


@NgModule({
  declarations: [
    AccountComponent,
    BonusesComponent
  ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        MatCardModule,
        MatButton,
        MatIcon,
        DeleteDialogAnimations,
        TableStickyFooterExample,
        BuyBonusesDialog,
        MatDivider,
    ]
})
export class AccountModule { }
