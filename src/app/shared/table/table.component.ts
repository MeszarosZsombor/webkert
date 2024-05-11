import {Component, OnInit} from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MainModule} from "../../pages/main/main.module";
import {SelectionModel} from "@angular/cdk/collections";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {Bonuses} from "../models/Bonuses";
import {BonusesService} from "../services/bonuses.service";

export interface Transaction {
  item: string;
  cost: number;
  position: number;
}

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
  displayedColumns = ['item', 'cost', 'select'];

  bonuses: Bonuses[] = []; // Initialize bonuses array

  dataSource = new MatTableDataSource<Bonuses>(this.bonuses); // Use Bonus interface
  selection = new SelectionModel<Bonuses>(true, []); // Use Bonus interface

  constructor(private bonusesService: BonusesService) {}

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    console.log(typeof (this.selection.selected.map(t => t.price).reduce((acc, value) => acc + value, 0)));
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
    this.bonusesService.getAll().subscribe(bonuses => {
      this.bonuses = bonuses;
      this.dataSource = new MatTableDataSource<Bonuses>(this.bonuses);
    });
  }
}
