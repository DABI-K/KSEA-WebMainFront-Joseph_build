import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView14Component } from './job-view14.component';

describe('JobView14Component', () => {
  let component: JobView14Component;
  let fixture: ComponentFixture<JobView14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView14Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
