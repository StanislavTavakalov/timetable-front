import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitStudyPlanComponent } from './submit-study-plan.component';

describe('SubmitStudyPlanComponent', () => {
  let component: SubmitStudyPlanComponent;
  let fixture: ComponentFixture<SubmitStudyPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitStudyPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitStudyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
