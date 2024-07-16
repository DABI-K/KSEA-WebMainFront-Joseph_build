import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView6Component } from './job-view6.component';

describe('JobView6Component', () => {
  let component: JobView6Component;
  let fixture: ComponentFixture<JobView6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
