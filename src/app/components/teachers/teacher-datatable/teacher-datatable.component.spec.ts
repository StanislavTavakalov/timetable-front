import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDatatableComponent } from './teacher-datatable.component';

describe('TeacherDatatableComponent', () => {
  let component: TeacherDatatableComponent;
  let fixture: ComponentFixture<TeacherDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
