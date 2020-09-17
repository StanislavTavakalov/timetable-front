import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityDeleteComponent } from './speciality-delete.component';

describe('SpecialityDeleteComponent', () => {
  let component: SpecialityDeleteComponent;
  let fixture: ComponentFixture<SpecialityDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialityDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
