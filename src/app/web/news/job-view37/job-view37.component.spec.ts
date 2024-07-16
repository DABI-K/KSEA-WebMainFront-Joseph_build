import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView37Component } from './job-view37.component';

describe('JobView37Component', () => {
  let component: JobView37Component;
  let fixture: ComponentFixture<JobView37Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView37Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView37Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
