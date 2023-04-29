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
  transformOrigin = "center";
  maxColumnCount = 10;
  selected = false;

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
    this.maxColumnCount = 5;
    if (window.innerWidth <= 500) {
      this.maxColumnCount = 1;
    } else if (window.innerWidth <= 800) {
      this.maxColumnCount = 2;
    } else if (window.innerWidth <= 1000) {
      this.maxColumnCount = 3;
    } else if (window.innerWidth <= 1200) {
      this.maxColumnCount = 4
    }
    this.columnCount = this.thoughts.length <= this.maxColumnCount ? this.thoughts.length : this.maxColumnCount;
  }

  ngOnInit(): void {
  }

  determineTransformOrigin(thought: Thought, i: number) {
    if (this.thoughts.length < this.maxColumnCount) {
      if (i === 0) {
        this.transformOrigin = "left";
      } else if (i === this.thoughts.length - 1) {
        this.transformOrigin = "right";
      } else {
        this.transformOrigin = "center";
      }
    } else {
      if (i % this.maxColumnCount === 0 || i === 0) {
        this.transformOrigin = "left";
      } else if ((i + 1) % this.maxColumnCount === 0) {
        this.transformOrigin = "right"
      } else {
        this.transformOrigin = "center";
      }
    }
  }

  determineResponseClasses = (thought: Thought) => Array.of(this.determineThoughtSelected(thought), this.determineFontSize(thought))

  determineThoughtSelected = (thought: Thought) => thought.selected ? "selected" : "";

  determineFontSize = (thought: Thought) => this.maxColumnCount <= 3 ? "smaller-font" : "";

  selectResponse(thought: Thought) {
    this.thoughts
      .filter(t => t.id !== thought.id)
      .forEach(t => t.selected = false);
    thought.selected = true;
    this.selected = true;
  }

  unSelectResponse(thought: Thought) {
    thought.selected = false;
    this.selected = false;
  }

  deleteThought(thought: Thought) {
    this.unSelectResponse(thought);
    this.firestoreService.deleteThought(this.thinkYe.id, thought.id);
  }
}
