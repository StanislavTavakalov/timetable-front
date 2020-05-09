import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSemesterComponent } from './select-semester.component';

describe('SelectSemesterComponent', () => {
  let component: SelectSemesterComponent;
  let fixture: ComponentFixture<SelectSemesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSemesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
