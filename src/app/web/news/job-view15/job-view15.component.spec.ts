import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView15Component } from './job-view15.component';

describe('JobView15Component', () => {
  let component: JobView15Component;
  let fixture: ComponentFixture<JobView15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView15Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
