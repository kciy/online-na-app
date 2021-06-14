import { TestBed } from '@angular/core/testing';

import { MainInformationService } from './main-information.service';

describe('MainInformationService', () => {
  let service: MainInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
