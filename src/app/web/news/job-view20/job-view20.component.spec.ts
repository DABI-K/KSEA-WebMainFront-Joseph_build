import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView20Component } from './job-view20.component';

describe('JobView20Component', () => {
  let component: JobView20Component;
  let fixture: ComponentFixture<JobView20Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView20Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
