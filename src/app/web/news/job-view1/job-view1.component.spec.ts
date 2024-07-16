import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView1Component } from './job-view1.component';

describe('JobView1Component', () => {
  let component: JobView1Component;
  let fixture: ComponentFixture<JobView1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
