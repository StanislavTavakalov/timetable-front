import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowMainComponent } from './flow-main.component';

describe('FlowMainComponent', () => {
  let component: FlowMainComponent;
  let fixture: ComponentFixture<FlowMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
