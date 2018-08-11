import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewThemeComponent } from './add-new-theme.component';

describe('AddNewThemeComponent', () => {
  let component: AddNewThemeComponent;
  let fixture: ComponentFixture<AddNewThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
