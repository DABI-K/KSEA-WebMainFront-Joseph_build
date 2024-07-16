import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyScholarshipApplicationComponent } from './apply-scholarship-application.component';

describe('ApplyScholarshipApplicationComponent', () => {
  let component: ApplyScholarshipApplicationComponent;
  let fixture: ComponentFixture<ApplyScholarshipApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyScholarshipApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyScholarshipApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
