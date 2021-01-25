import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDbsComponent } from './all-dbs.component';

describe('AllDbsComponent', () => {
  let component: AllDbsComponent;
  let fixture: ComponentFixture<AllDbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
