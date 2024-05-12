import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MainModule} from "../../pages/main/main.module";
import {SelectionModel} from "@angular/cdk/collections";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {Bonuses} from "../models/Bonuses";
import {BonusesService} from "../services/bonuses.service";
import {UserService} from "../services/user.service";

/**
 * @title Table with a sticky footer
 */
@Component({
  selector: 'table-sticky-footer',
  styleUrl: 'table-sticky-footer.css',
  templateUrl: 'table-sticky-footer.html',
  standalone: true,
  imports: [MatTableModule, MainModule, MatCheckboxModule],
})
export class TableStickyFooterExample implements OnInit {
  @Output() selectedBonusesChanged = new EventEmitter<Bonuses[]>();
  @Output() selectionChanged = new EventEmitter<SelectionModel<Bonuses>>();

  displayedColumns = ['item', 'cost', 'select'];
  userBonuses: string[] = [];
  user = localStorage.getItem('user');
  uid = JSON.parse(this.user as string).uid;

  bonuses: Bonuses[] = []; // Initialize bonuses array

  dataSource = new MatTableDataSource<Bonuses>(this.bonuses); // Use Bonus interface
  selection = new SelectionModel<Bonuses>(true, []); // Use Bonus interface

  constructor(private bonusesService: BonusesService, private userService: UserService) {}

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.selection.selected.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Bonuses): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number(row.id)}`;
  }

  ngOnInit() {
    this.bonusesService.getAllOrderByPrice(this.uid).subscribe(bonuses => {

      const user = localStorage.getItem('user');
      const uid = JSON.parse(user as string).uid;
      this.userService.getUserBonuses(uid).then(userBonuses => {
        this.userBonuses = userBonuses;

        this.bonuses = bonuses.sort((a, b) => {
          const aIsOwned = this.userBonuses.includes(a.id);
          const bIsOwned = this.userBonuses.includes(b.id);

          if (aIsOwned && !bIsOwned) {
            return -1;
          } else if (!aIsOwned && bIsOwned) {
            return 1;
          } else {
            return 0;
          }
        });

        this.dataSource = new MatTableDataSource<Bonuses>(this.bonuses);

        this.bonuses.forEach(bonus => {
          if (this.userBonuses.includes(bonus.id)) {
            this.selection.select(bonus);
          }
        });

        this.selection.changed.subscribe(() => {
          this.selectedBonusesChanged.emit(this.selection.selected);
        });

      });
    });
  }
}
