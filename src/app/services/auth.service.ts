import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';

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
        .catch((reason) => {
          console.error(reason);
          reject(false);
        });
    });
  }

  logOut() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/home');
    })
      .catch(reason => console.error(reason));
  }

  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password).then(() => {
        this.router.navigateByUrl('/dashboard');
        resolve(true);
      })
        .catch((res) => {
          reason => console.error(reason)
          reject(false);
        });
    });
  }
}
