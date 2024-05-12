import { Injectable } from '@angular/core';
import {Bonuses} from "../models/Bonuses";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MatDialog} from "@angular/material/dialog";
import {from, Observable, switchMap} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class BonusesService {

  bonuses: Bonuses[] = [];
  collection = "Bonuses";

  constructor(private afs: AngularFirestore,
              public dialog: MatDialog,
              private userService: UserService) { }

  getAll(): Observable<Bonuses[]> {
    return this.afs.collection<Bonuses>(this.collection).valueChanges();
  }

  getById(id: string){
    return this.afs.collection<Bonuses>(this.collection).doc(id).valueChanges();
  }

  getAllOrderByPrice(uid: string) {
    return from(this.userService.getUserBonuses(uid)).pipe(
      switchMap(userBonuses => {
        return this.afs.collection<Bonuses>(this.collection, ref => ref.orderBy('price')).valueChanges();
      })
    );
  }
}
