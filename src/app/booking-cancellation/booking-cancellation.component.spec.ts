import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCancellationComponent } from './booking-cancellation.component';

describe('BookingCancellationComponent', () => {
  let component: BookingCancellationComponent;
  let fixture: ComponentFixture<BookingCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingCancellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
