import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsAndFlowsComponent } from './groups-and-flows.component';

describe('GroupsAndFlowsComponent', () => {
  let component: GroupsAndFlowsComponent;
  let fixture: ComponentFixture<GroupsAndFlowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsAndFlowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsAndFlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
