import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView29Component } from './job-view29.component';

describe('JobView29Component', () => {
  let component: JobView29Component;
  let fixture: ComponentFixture<JobView29Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView29Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView29Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
