import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValveMovementComponent } from './valve-movement.component';

describe('ValveMovementComponent', () => {
  let component: ValveMovementComponent;
  let fixture: ComponentFixture<ValveMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValveMovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValveMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
