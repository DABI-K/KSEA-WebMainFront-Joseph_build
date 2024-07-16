import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView9Component } from './job-view9.component';

describe('JobView9Component', () => {
  let component: JobView9Component;
  let fixture: ComponentFixture<JobView9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView9Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
