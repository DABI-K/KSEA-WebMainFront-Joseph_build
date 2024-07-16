import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView19Component } from './job-view19.component';

describe('JobView19Component', () => {
  let component: JobView19Component;
  let fixture: ComponentFixture<JobView19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView19Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
