import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView38Component } from './job-view38.component';

describe('JobView38Component', () => {
  let component: JobView38Component;
  let fixture: ComponentFixture<JobView38Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView38Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView38Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
