import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOccupationComponent } from './create-occupation.component';

describe('CreateOccupationComponent', () => {
  let component: CreateOccupationComponent;
  let fixture: ComponentFixture<CreateOccupationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOccupationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOccupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
