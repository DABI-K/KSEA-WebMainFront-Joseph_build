import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView32Component } from './job-view32.component';

describe('JobView32Component', () => {
  let component: JobView32Component;
  let fixture: ComponentFixture<JobView32Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView32Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView32Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
