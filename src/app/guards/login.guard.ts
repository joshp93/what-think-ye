import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(private router: Router, private auth: AngularFireAuth) { }

  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(map((user) => {
        return user ? true : this.redirectToLogin();
      })
    );
  }

  redirectToLogin(): boolean {
    this.router.navigate(['/login']);
    return false;
  }
  
}
