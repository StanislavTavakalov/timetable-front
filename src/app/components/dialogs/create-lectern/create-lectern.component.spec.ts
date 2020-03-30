import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLecternComponent } from './create-lectern.component';

describe('CreateLecternComponent', () => {
  let component: CreateLecternComponent;
  let fixture: ComponentFixture<CreateLecternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLecternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLecternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
