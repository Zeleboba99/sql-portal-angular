import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAttemptComponent } from './view-attempt.component';

describe('ViewAttemptComponent', () => {
  let component: ViewAttemptComponent;
  let fixture: ComponentFixture<ViewAttemptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAttemptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
