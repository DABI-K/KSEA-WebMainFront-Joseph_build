import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView34Component } from './job-view34.component';

describe('JobView34Component', () => {
  let component: JobView34Component;
  let fixture: ComponentFixture<JobView34Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView34Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView34Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
