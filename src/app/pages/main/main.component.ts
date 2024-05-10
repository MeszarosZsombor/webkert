import { Component } from '@angular/core';
import {Package} from "../../shared/models/Package";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  packages = [{
    title: 'Alap csomag',
    price: 4000,
    description: 'Ez egy alap csomag, amiben minden benne van.'
  }, {
    title: 'Pro csomag',
    price: 8000,
    description: 'Ez egy pro csomag, amiben minden benne van.'
  }, {
    title: 'Vip csomag',
    price: 12000,
    description: 'Ez egy vip csomag, amiben minden benne van.'
  }, {
    title: 'Premium csomag',
    price: 16000,
    description: 'Ez egy premium csomag, amiben minden benne van.'
  }]

  constructor() {
  }


  buyPackage(phonePackage: Package) {

  }
}
