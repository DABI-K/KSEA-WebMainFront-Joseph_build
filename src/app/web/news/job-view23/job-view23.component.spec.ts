import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView23Component } from './job-view23.component';

describe('JobView23Component', () => {
  let component: JobView23Component;
  let fixture: ComponentFixture<JobView23Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView23Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
