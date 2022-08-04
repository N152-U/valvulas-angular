import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValveMovementEditComponent } from './valve-movement-edit.component';

describe('ValveMovementEditComponent', () => {
  let component: ValveMovementEditComponent;
  let fixture: ComponentFixture<ValveMovementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValveMovementEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValveMovementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
