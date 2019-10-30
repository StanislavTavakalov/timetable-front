import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableModeComponent } from './editable-mode.component';

describe('EditableModeComponent', () => {
  let component: EditableModeComponent;
  let fixture: ComponentFixture<EditableModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
