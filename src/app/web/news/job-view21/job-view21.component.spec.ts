import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView21Component } from './job-view21.component';

describe('JobView21Component', () => {
  let component: JobView21Component;
  let fixture: ComponentFixture<JobView21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView21Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
