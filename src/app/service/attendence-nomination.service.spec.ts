import { TestBed } from '@angular/core/testing';

import { AttendenceNominationService } from './attendence-nomination.service';

describe('AttendenceNominationService', () => {
  let service: AttendenceNominationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendenceNominationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
