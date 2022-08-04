import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValveTableComponent } from './valve-table.component';

describe('ValveTableComponent', () => {
  let component: ValveTableComponent;
  let fixture: ComponentFixture<ValveTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValveTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
