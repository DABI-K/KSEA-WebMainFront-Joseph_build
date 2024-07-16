import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView11Component } from './job-view11.component';

describe('JobView11Component', () => {
  let component: JobView11Component;
  let fixture: ComponentFixture<JobView11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView11Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
