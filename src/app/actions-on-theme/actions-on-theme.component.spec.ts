import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsOnThemeComponent } from './actions-on-theme.component';

describe('ActionsOnThemeComponent', () => {
  let component: ActionsOnThemeComponent;
  let fixture: ComponentFixture<ActionsOnThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsOnThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsOnThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
