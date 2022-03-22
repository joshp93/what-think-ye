import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';
import { User } from '../models/classes/user';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router, private firestoreService: FirestoreService) {
  }

  getAuthState = () => this.auth.authState;

  logIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password).then((res) => {
        let user = new User(res.user.uid, res.user.email);
        this.firestoreService.updateUserData(user);
        this.router.navigate(['/dashboard']);
        resolve(true);
      })
        .catch((res) => {
          alert(res.message);
          reject(false);
        });
    });
  }

  logOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
      .catch(reason => console.error(reason));
  }
}
