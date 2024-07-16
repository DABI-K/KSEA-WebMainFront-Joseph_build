import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView33Component } from './job-view33.component';

describe('JobView33Component', () => {
  let component: JobView33Component;
  let fixture: ComponentFixture<JobView33Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView33Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView33Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
