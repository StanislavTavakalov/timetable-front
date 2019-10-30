import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormForCreationComponent } from './form-for-creation.component';

describe('FormForCreationComponent', () => {
  let component: FormForCreationComponent;
  let fixture: ComponentFixture<FormForCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormForCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormForCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
