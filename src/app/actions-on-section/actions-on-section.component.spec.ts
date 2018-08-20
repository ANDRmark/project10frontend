import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsOnSectionComponent } from './actions-on-section.component';

describe('ActionsOnSectionComponent', () => {
  let component: ActionsOnSectionComponent;
  let fixture: ComponentFixture<ActionsOnSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsOnSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsOnSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
