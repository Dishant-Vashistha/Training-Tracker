import { TestBed } from '@angular/core/testing';

import { CourseTrainingService } from './course-training.service';

describe('CourseTrainingService', () => {
  let service: CourseTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
