import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewThinkYeComponent } from './new-think-ye.component';

describe('NewThinkYeComponent', () => {
  let component: NewThinkYeComponent;
  let fixture: ComponentFixture<NewThinkYeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewThinkYeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewThinkYeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
