import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView18Component } from './job-view18.component';

describe('JobView18Component', () => {
  let component: JobView18Component;
  let fixture: ComponentFixture<JobView18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView18Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
