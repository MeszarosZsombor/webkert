import { Injectable } from '@angular/core';
import {Bonuses} from "../models/Bonuses";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BonusesService {

  bonuses: Bonuses[] = [];
  collection = "Bonuses";

  constructor(private afs: AngularFirestore, public dialog: MatDialog) { }

  getAll(): Observable<Bonuses[]> {
    return this.afs.collection<Bonuses>(this.collection).valueChanges();
  }

  getById(id: string){
    return this.afs.collection<Bonuses>(this.collection).doc(id).valueChanges();
  }
}
