import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User;
  show = false;

  constructor(private firestoreService: FirestoreService, private router: Router, public authService: AuthService) {
    this.firestoreService.getUser().subscribe(fUser => {
      if (fUser) {
        this.user = new User(fUser.uid, fUser.email);
        this.show = true;
      } else {
        this.show = false;
      }
    });
  }

  ngOnInit(): void {
  }

  goToDashboard = () => this.router.navigateByUrl("dashboard");

}
