import { Injectable } from '@angular/core';
import {Package} from "../models/Package";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  packages: Package[] = []

  collection = "Packages";

  constructor(private afs: AngularFirestore) { }

  getAll() {
    this.afs.collection<Package>(this.collection).valueChanges().subscribe(packages => {
      this.packages = packages;
    });
  }
}
