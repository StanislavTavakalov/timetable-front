import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeaneryComponent } from './deanery.component';

describe('DeaneryComponent', () => {
  let component: DeaneryComponent;
  let fixture: ComponentFixture<DeaneryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeaneryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeaneryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
