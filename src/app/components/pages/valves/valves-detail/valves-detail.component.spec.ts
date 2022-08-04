import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValvesDetailComponent } from './valves-detail.component';

describe('ValvesDetailComponent', () => {
  let component: ValvesDetailComponent;
  let fixture: ComponentFixture<ValvesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValvesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValvesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
