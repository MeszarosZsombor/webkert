import { Component } from '@angular/core';
import {Bonuses} from "../../../shared/models/Bonuses";

@Component({
  selector: 'app-bonuses',
  templateUrl: './bonuses.component.html',
  styleUrl: './bonuses.component.scss'
})
export class BonusesComponent {
  selectedBonuses: Bonuses[] = [];
}
