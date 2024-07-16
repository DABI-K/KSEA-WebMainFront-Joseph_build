import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView24Component } from './job-view24.component';

describe('JobView24Component', () => {
  let component: JobView24Component;
  let fixture: ComponentFixture<JobView24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView24Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
