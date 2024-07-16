import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView2Component } from './job-view2.component';

describe('JobView2Component', () => {
  let component: JobView2Component;
  let fixture: ComponentFixture<JobView2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
