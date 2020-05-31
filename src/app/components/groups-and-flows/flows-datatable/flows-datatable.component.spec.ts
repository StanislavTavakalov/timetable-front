import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowsDatatableComponent } from './flows-datatable.component';

describe('FlowsDatatableComponent', () => {
  let component: FlowsDatatableComponent;
  let fixture: ComponentFixture<FlowsDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowsDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowsDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
