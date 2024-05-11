import {Component} from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MainModule} from "../../pages/main/main.module";
import {SelectionModel} from "@angular/cdk/collections";
import {MatCheckboxModule} from "@angular/material/checkbox";

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
export class TableStickyFooterExample {
  displayedColumns = ['item', 'cost', 'select'];

  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4, position: 0},
    {item: 'Towel', cost: 5, position: 1},
    {item: 'Frisbee', cost: 2, position: 2},
    {item: 'Sunscreen', cost: 4, position: 3},
    {item: 'Cooler', cost: 25, position: 4},
    {item: 'Swim suit', cost: 15, position: 5},
  ];

  dataSource = new MatTableDataSource<Transaction>(this.transactions);
  selection = new SelectionModel<Transaction>(true, []);

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.selection.selected.map(t => t.cost).reduce((acc, value) => acc + value, 0);
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
  checkboxLabel(row?: Transaction): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
