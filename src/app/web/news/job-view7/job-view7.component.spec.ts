import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView7Component } from './job-view7.component';

describe('JobView7Component', () => {
  let component: JobView7Component;
  let fixture: ComponentFixture<JobView7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
