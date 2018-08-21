import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsOnMessageComponent } from './actions-on-message.component';

describe('ActionsOnMessageComponent', () => {
  let component: ActionsOnMessageComponent;
  let fixture: ComponentFixture<ActionsOnMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsOnMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsOnMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
