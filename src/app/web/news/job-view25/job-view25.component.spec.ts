import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView25Component } from './job-view25.component';

describe('JobView25Component', () => {
  let component: JobView25Component;
  let fixture: ComponentFixture<JobView25Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView25Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
