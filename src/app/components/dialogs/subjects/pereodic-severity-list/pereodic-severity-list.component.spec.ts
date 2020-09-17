import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PereodicSeverityListComponent } from './pereodic-severity-list.component';

describe('PereodicSeverityListComponent', () => {
  let component: PereodicSeverityListComponent;
  let fixture: ComponentFixture<PereodicSeverityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PereodicSeverityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PereodicSeverityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
