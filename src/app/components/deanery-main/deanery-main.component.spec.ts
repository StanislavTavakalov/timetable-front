import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeaneryMainComponent } from './deanery-main.component';

describe('DeaneryMainComponent', () => {
  let component: DeaneryMainComponent;
  let fixture: ComponentFixture<DeaneryMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeaneryMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeaneryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
