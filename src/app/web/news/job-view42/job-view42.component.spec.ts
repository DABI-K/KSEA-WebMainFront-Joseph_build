import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView42Component } from './job-view42.component';

describe('JobView42Component', () => {
  let component: JobView42Component;
  let fixture: ComponentFixture<JobView42Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView42Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView42Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
