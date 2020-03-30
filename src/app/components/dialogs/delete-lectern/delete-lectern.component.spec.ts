import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLecternComponent } from './delete-lectern.component';

describe('DeleteLecternComponent', () => {
  let component: DeleteLecternComponent;
  let fixture: ComponentFixture<DeleteLecternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteLecternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLecternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
