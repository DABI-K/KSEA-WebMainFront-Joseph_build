import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView5Component } from './job-view5.component';

describe('JobView5Component', () => {
  let component: JobView5Component;
  let fixture: ComponentFixture<JobView5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
