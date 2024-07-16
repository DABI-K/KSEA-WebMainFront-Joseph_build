import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView41Component } from './job-view41.component';

describe('JobView41Component', () => {
  let component: JobView41Component;
  let fixture: ComponentFixture<JobView41Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView41Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView41Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
