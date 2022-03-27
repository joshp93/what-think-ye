import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinkYeVisualisationComponent } from './think-ye-visualisation.component';

describe('ThinkYeVisualisationComponent', () => {
  let component: ThinkYeVisualisationComponent;
  let fixture: ComponentFixture<ThinkYeVisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThinkYeVisualisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThinkYeVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
