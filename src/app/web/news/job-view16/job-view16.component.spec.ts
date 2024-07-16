import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView16Component } from './job-view16.component';

describe('JobView16Component', () => {
  let component: JobView16Component;
  let fixture: ComponentFixture<JobView16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView16Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
