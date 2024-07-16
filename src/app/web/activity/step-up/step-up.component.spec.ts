import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepUpComponent } from './step-up.component';

describe('StepUpComponent', () => {
  let component: StepUpComponent;
  let fixture: ComponentFixture<StepUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
