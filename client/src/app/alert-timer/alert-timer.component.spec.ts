import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTimerComponent } from './alert-timer.component';

describe('AlertTimerComponent', () => {
  let component: AlertTimerComponent;
  let fixture: ComponentFixture<AlertTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertTimerComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
