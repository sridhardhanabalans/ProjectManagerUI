import { TestBed, inject } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';

describe('SharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SharedService]
    });
  });

  it('should be created', inject([SharedService], (service: SharedService) => {
    expect(service).toBeTruthy();
  }));
});
