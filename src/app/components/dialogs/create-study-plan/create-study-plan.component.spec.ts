import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudyPlanComponent } from './create-study-plan.component';

describe('CreateStudyPlanComponent', () => {
  let component: CreateStudyPlanComponent;
  let fixture: ComponentFixture<CreateStudyPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStudyPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStudyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
