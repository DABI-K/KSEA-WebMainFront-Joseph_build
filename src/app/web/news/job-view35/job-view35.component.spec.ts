import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView35Component } from './job-view35.component';

describe('JobView35Component', () => {
  let component: JobView35Component;
  let fixture: ComponentFixture<JobView35Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView35Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView35Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
