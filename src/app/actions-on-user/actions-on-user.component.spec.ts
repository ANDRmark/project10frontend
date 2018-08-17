import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsOnUserComponent } from './actions-on-user.component';

describe('ActionsOnUserComponent', () => {
  let component: ActionsOnUserComponent;
  let fixture: ComponentFixture<ActionsOnUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsOnUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsOnUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
