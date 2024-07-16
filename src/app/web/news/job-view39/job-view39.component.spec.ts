import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView39Component } from './job-view39.component';

describe('JobView39Component', () => {
  let component: JobView39Component;
  let fixture: ComponentFixture<JobView39Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView39Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView39Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
