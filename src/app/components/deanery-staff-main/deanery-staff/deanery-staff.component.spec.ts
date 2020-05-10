import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeaneryStaffComponent } from './deanery-staff.component';

describe('DeaneryStaffComponent', () => {
  let component: DeaneryStaffComponent;
  let fixture: ComponentFixture<DeaneryStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeaneryStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeaneryStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
