import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView13Component } from './job-view13.component';

describe('JobView13Component', () => {
  let component: JobView13Component;
  let fixture: ComponentFixture<JobView13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView13Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
