import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNominationsComponent } from './upload-nominations.component';

describe('UploadNominationsComponent', () => {
  let component: UploadNominationsComponent;
  let fixture: ComponentFixture<UploadNominationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadNominationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadNominationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
