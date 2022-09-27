import { TestBed } from '@angular/core/testing';

import { ColourPickerService } from './colour-picker.service';

describe('ColourPickerService', () => {
  let service: ColourPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColourPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
