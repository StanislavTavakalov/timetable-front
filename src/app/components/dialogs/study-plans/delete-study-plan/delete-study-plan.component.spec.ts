import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStudyPlanComponent } from './delete-study-plan.component';

describe('DeleteStudyPlanComponent', () => {
  let component: DeleteStudyPlanComponent;
  let fixture: ComponentFixture<DeleteStudyPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteStudyPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStudyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
