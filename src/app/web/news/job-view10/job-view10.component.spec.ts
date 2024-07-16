import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView10Component } from './job-view10.component';

describe('JobView9Component', () => {
  let component: JobView10Component;
  let fixture: ComponentFixture<JobView10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView10Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
