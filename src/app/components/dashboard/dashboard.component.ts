import { Component, OnInit } from '@angular/core';
import { ThinkYe } from 'src/app/models/classes/think-ye';
import { User } from 'src/app/models/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  thinkYes: ThinkYe[];
  question = "";
  user: User;
  
  constructor(private firestoreService: FirestoreService, public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getAuthState().subscribe(fUser => {
      this.user = new User(fUser.uid, fUser.email);
      this.firestoreService.getThinkYes(this.user.uid).subscribe(results => this.thinkYes = results);
    });
  }

  getThoughts = (thinkYeId: string) => this.firestoreService.getThoughtsForThinkYe(this.user.uid, thinkYeId).subscribe(results => console.log(results));

  createThinkYe = (question: string) => this.firestoreService.createThinkYe(this.user.uid, new ThinkYe("", question, []));

  deleteThinkYe = (thinkYeId: string) => this.firestoreService.deleteThinkYe(this.user.uid, thinkYeId);

}
