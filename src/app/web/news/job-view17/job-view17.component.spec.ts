import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView17Component } from './job-view17.component';

describe('JobView17Component', () => {
  let component: JobView17Component;
  let fixture: ComponentFixture<JobView17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView17Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
