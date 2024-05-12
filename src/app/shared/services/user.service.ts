import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/User";
import {Bonuses} from "../models/Bonuses";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collection = "Users";

  constructor(private afs: AngularFirestore) { }

  create(user: User){
    return this.afs.collection<User>(this.collection).doc(user.id).set(user);
  }

  getById(id: string | null){
    return this.afs.collection<User>(this.collection).doc(id || undefined).valueChanges();
  }

  update(user: User){
    return this.afs.collection<User>(this.collection).doc(user.id).set(user);
  }

  delete(id: string){
    return this.afs.collection<User>(this.collection).doc(id).delete();
  }

  async addPackageToUser(uid: string, packageId: string) {
    // Lekérdezzük a felhasználót az adatbázisból
    const doc = await this.afs.collection<User>(this.collection).doc(uid).get().toPromise();
    if (doc?.exists) {
      // Ha a felhasználó létezik, akkor hozzárendeljük a csomag ID-jét a package tulajdonsághoz
      return this.afs.collection<User>(this.collection).doc(uid).update({package: packageId});
    } else {
      throw new Error('User does not exist');
    }
  }

  async buyBonuses(uid: string, selectedBonuses: Bonuses[]) {
    const doc = await this.afs.collection<User>(this.collection).doc(uid).get().toPromise();
    if (doc?.exists) {
      const user = doc.data() as User;
      user.bonuses = [];
      selectedBonuses.forEach(bonus => {
        user.bonuses.push(bonus.id);
      });
      return this.afs.collection<User>(this.collection).doc(uid).update(user);
    } else {
      throw new Error('User does not exist');
    }
  }

  async getUserBonuses(uid: string): Promise<string[]> {
    const doc = await this.afs.collection<User>(this.collection).doc(uid).get().toPromise();
    if (doc?.exists) {
        const user = doc.data() as User;
        return user.bonuses;
      } else {
        throw new Error('User does not exist');
    }
  }
}
