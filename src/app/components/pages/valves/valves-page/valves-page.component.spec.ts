import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValvesPageComponent } from './valves-page.component';

describe('ValvesPageComponent', () => {
  let component: ValvesPageComponent;
  let fixture: ComponentFixture<ValvesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValvesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValvesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
