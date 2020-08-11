import { TestBed } from '@angular/core/testing';

import { GetCourseTrainingService } from './get-course-training.service';

describe('GetCourseTrainingService', () => {
  let service: GetCourseTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCourseTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
