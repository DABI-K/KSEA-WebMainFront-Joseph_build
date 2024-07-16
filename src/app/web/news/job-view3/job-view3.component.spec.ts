import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView3Component } from './job-view3.component';

describe('JobView3Component', () => {
  let component: JobView3Component;
  let fixture: ComponentFixture<JobView3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
