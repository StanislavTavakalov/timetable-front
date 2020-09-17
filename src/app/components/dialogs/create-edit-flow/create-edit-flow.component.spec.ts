import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditFlowComponent } from './create-edit-flow.component';

describe('CreateEditFlowComponent', () => {
  let component: CreateEditFlowComponent;
  let fixture: ComponentFixture<CreateEditFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
