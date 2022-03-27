import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThinkYe } from 'src/app/models/classes/think-ye';
import { Thought } from 'src/app/models/classes/thought';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-think-ye-visualisation',
  templateUrl: './think-ye-visualisation.component.html',
  styleUrls: ['./think-ye-visualisation.component.scss']
})
export class ThinkYeVisualisationComponent implements OnInit {
  thinkYe: ThinkYe;
  thoughts: Thought[];
  questionUrl = "";

  constructor(private route: ActivatedRoute, private firestoreService: FirestoreService) {
    const thinkYeId = route.snapshot.url[0].path;
    firestoreService.getThinkYe(thinkYeId).subscribe(result => {
      this.thinkYe = result;
      this.questionUrl = `${location.origin}/${thinkYeId}`;
    });
    firestoreService.getThoughtsForThinkYe(thinkYeId).subscribe(results => this.thoughts = results);
  }

  ngOnInit(): void {
  }

}
