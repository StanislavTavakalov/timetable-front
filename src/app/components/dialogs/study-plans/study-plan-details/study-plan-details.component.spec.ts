import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPlanDetailsComponent } from './study-plan-details.component';

describe('StudyPlanDetailsComponent', () => {
  let component: StudyPlanDetailsComponent;
  let fixture: ComponentFixture<StudyPlanDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyPlanDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyPlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
