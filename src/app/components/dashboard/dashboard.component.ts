import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewThinkYeComponent } from 'src/app/dialogs/new-think-ye/new-think-ye.component';
import { ThinkYe } from 'src/app/models/classes/think-ye';
import { User } from 'src/app/models/classes/user';
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
  
  constructor(private firestoreService: FirestoreService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.firestoreService.getUser().subscribe(fUser => {
      this.user = new User(fUser.uid, fUser.email);
      this.firestoreService.getThinkYes().subscribe(results => this.thinkYes = results);
    });
  }

  createThinkYe() {
    const dialogRef = this.dialog.open(NewThinkYeComponent).afterClosed().subscribe(value => {
      if (value !== "###close###") {
        this.firestoreService.createThinkYe(new ThinkYe("", value, this.user.uid));
      }
    });
  }

  deleteThinkYe = (thinkYe: ThinkYe) => this.firestoreService.deleteThinkYe(thinkYe);

  openThinkYe = (thinkYeId: string) => this.router.navigateByUrl(`${thinkYeId}/visualisation`);

}
