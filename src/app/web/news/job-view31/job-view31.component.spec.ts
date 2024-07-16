import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView31Component } from './job-view31.component';

describe('JobView31Component', () => {
  let component: JobView31Component;
  let fixture: ComponentFixture<JobView31Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView31Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
