import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView30Component } from './job-view30.component';

describe('JobView30Component', () => {
  let component: JobView30Component;
  let fixture: ComponentFixture<JobView30Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView30Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView30Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
