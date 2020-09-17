import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityDatatableComponent } from './speciality-datatable.component';

describe('SpecialityDatatableComponent', () => {
  let component: SpecialityDatatableComponent;
  let fixture: ComponentFixture<SpecialityDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialityDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
