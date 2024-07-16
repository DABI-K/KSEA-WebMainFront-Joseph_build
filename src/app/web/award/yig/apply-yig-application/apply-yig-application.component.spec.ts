import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyYigApplicationComponent } from './apply-yig-application.component';

describe('ApplyYigApplicationComponent', () => {
  let component: ApplyYigApplicationComponent;
  let fixture: ComponentFixture<ApplyYigApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyYigApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyYigApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
