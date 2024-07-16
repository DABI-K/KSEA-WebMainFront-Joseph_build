import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView12Component } from './job-view12.component';

describe('JobView12Component', () => {
  let component: JobView12Component;
  let fixture: ComponentFixture<JobView12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView12Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
