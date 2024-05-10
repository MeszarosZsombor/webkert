import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import {log} from "util";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent{

  @Input() currentPage: string = '';
  @Input() loggedInUser?: firebase.default.User | null;
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  menuSwitch() {
    this.selectedPage.emit(this.currentPage);
  }

  close(logout?: boolean) {
    if(logout) {
      this.onLogout.emit(logout);
    }
    this.onCloseSidenav.emit(true);

  }
}
