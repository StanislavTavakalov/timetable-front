import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectTemplatesDatatableComponent } from './subject-templates-datatable.component';

describe('SubjectTemplatesDatatableComponent', () => {
  let component: SubjectTemplatesDatatableComponent;
  let fixture: ComponentFixture<SubjectTemplatesDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectTemplatesDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectTemplatesDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
