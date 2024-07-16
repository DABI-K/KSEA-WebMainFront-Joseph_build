import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView36Component } from './job-view36.component';

describe('JobView36Component', () => {
  let component: JobView36Component;
  let fixture: ComponentFixture<JobView36Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView36Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView36Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
