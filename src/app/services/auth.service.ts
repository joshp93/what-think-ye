import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { User } from '../models/classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router) {
  }

  getAuthState = () => this.auth.authState;

  logIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password).then(() => {
        this.router.navigateByUrl('/dashboard');
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
      this.router.navigateByUrl('/login');
    })
      .catch(reason => console.error(reason));
  }

  registerUser(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then(() => this.router.navigateByUrl('/dashboard'));
  }
}
