import { Injectable } from '@angular/core';
import {Package} from "../models/Package";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import { MatDialog } from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  packages: Package[] = [];

  collection = "Packages";

  constructor(private afs: AngularFirestore, public dialog: MatDialog) { }

  getAll(): Observable<Package[]> {
    return this.afs.collection<Package>(this.collection).valueChanges();
  }

  getAllOrderByPrice() {
    return this.afs.collection<Package>(this.collection, ref => ref.orderBy('price')).valueChanges();
  }

  getById(id: string){
    return this.afs.collection<Package>(this.collection).doc(id).valueChanges();
  }
}
