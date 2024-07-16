import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView28Component } from './job-view28.component';

describe('JobView28Component', () => {
  let component: JobView28Component;
  let fixture: ComponentFixture<JobView28Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView28Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView28Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
