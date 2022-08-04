import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValveEditComponent } from './valve-edit.component';

describe('ValveEditComponent', () => {
  let component: ValveEditComponent;
  let fixture: ComponentFixture<ValveEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValveEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
