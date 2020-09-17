import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeaneryStaffMainComponent } from './deanery-staff-main.component';

describe('DeaneryStaffMainComponent', () => {
  let component: DeaneryStaffMainComponent;
  let fixture: ComponentFixture<DeaneryStaffMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeaneryStaffMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeaneryStaffMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
