import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudyPlanComponent } from './edit-study-plan.component';

describe('EditStudyPlanComponent', () => {
  let component: EditStudyPlanComponent;
  let fixture: ComponentFixture<EditStudyPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStudyPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
