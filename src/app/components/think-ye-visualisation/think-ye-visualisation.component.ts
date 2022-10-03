import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThinkYe } from 'src/app/models/classes/think-ye';
import { Thought } from 'src/app/models/classes/thought';
import { ColourPickerService } from 'src/app/services/colour-picker.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-think-ye-visualisation',
  templateUrl: './think-ye-visualisation.component.html',
  styleUrls: ['./think-ye-visualisation.component.scss']
})
export class ThinkYeVisualisationComponent implements OnInit {
  thinkYe: ThinkYe;
  thoughts: Thought[] = new Array();
  origin = window.origin;
  columnCount = 1;
  selectedThought: Thought;

  constructor(private route: ActivatedRoute, private firestoreService: FirestoreService, private colourPickerService: ColourPickerService) {
    const thinkYeId = route.snapshot.url[0].path;
    firestoreService.getThinkYe(thinkYeId).subscribe(result => this.thinkYe = result);
    firestoreService.getThoughtsForThinkYe(thinkYeId).subscribe(results => {
      this.thoughts = new Array();
      results.forEach(result => this.thoughts.push(new Thought(result.id, result.value, this.colourPickerService.getRandomColour())));
      this.updateColumnCount();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateColumnCount();
  }
  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange() {
    this.updateColumnCount();
  }

  private updateColumnCount() {
    let maxColumnCount = 10;
    if (window.innerWidth <= 500) {
      maxColumnCount = 4;
    } else if (window.innerWidth <= 800) {
      maxColumnCount = 7;
    }
    this.columnCount = this.thoughts.length <= maxColumnCount ? this.thoughts.length : maxColumnCount;
  }

  ngOnInit(): void {
  }
}
