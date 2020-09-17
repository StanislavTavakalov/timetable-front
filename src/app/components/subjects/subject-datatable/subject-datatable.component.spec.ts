import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDatatableComponent } from './subject-datatable.component';

describe('SubjectDatatableComponent', () => {
  let component: SubjectDatatableComponent;
  let fixture: ComponentFixture<SubjectDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
