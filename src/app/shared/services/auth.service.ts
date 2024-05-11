import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn(){
    return this.auth.user;
  }

  logout(){
    return this.auth.signOut();
  }

  async getCurrentUserId(): Promise<string | null> {
  let user = await this.auth.currentUser;
  return user ? user.uid : null;
}

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
