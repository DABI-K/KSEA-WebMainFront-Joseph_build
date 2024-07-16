import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView8Component } from './job-view8.component';

describe('JobView8Component', () => {
  let component: JobView8Component;
  let fixture: ComponentFixture<JobView8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
