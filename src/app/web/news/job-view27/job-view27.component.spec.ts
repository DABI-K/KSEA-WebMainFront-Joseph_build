import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView27Component } from './job-view27.component';

describe('JobView27Component', () => {
  let component: JobView27Component;
  let fixture: ComponentFixture<JobView27Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView27Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView27Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
