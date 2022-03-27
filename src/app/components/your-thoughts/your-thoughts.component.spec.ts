import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourThoughtsComponent } from './your-thoughts.component';

describe('YourThoughtsComponent', () => {
  let component: YourThoughtsComponent;
  let fixture: ComponentFixture<YourThoughtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourThoughtsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourThoughtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
