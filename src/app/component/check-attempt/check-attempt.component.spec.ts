import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAttemptComponent } from './check-attempt.component';

describe('CheckAttemptComponent', () => {
  let component: CheckAttemptComponent;
  let fixture: ComponentFixture<CheckAttemptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckAttemptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
