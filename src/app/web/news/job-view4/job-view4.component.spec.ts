import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView4Component } from './job-view4.component';

describe('JobView4Component', () => {
  let component: JobView4Component;
  let fixture: ComponentFixture<JobView4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
