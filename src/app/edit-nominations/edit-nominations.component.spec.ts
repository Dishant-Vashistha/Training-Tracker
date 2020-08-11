import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNominationsComponent } from './edit-nominations.component';

describe('EditNominationsComponent', () => {
  let component: EditNominationsComponent;
  let fixture: ComponentFixture<EditNominationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNominationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNominationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
