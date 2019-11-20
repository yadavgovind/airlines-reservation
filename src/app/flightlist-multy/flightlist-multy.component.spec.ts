import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightlistMultyComponent } from './flightlist-multy.component';

describe('FlightlistMultyComponent', () => {
  let component: FlightlistMultyComponent;
  let fixture: ComponentFixture<FlightlistMultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightlistMultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightlistMultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
