import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collection = "Users";

  constructor(private afs: AngularFirestore) { }

  create(user: User){
    return this.afs.collection<User>(this.collection).doc(user.id).set(user);
  }

  getById(id: string){
    return this.afs.collection<User>(this.collection).doc(id).valueChanges();
  }

  update(user: User){
    return this.afs.collection<User>(this.collection).doc(user.id).set(user);
  }

  delete(id: string){
    return this.afs.collection<User>(this.collection).doc(id).delete();
  }

}
