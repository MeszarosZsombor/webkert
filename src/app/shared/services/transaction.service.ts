import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Transaction} from "../models/Transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  collection = "Transactions";

  constructor(private afs: AngularFirestore) { }

  create(transaction: Transaction){
    return this.afs.collection<Transaction>(this.collection).add(transaction);
  }
}
