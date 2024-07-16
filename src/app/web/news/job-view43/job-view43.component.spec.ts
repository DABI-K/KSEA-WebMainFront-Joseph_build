import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView43Component } from './job-view43.component';

describe('JobView43Component', () => {
  let component: JobView43Component;
  let fixture: ComponentFixture<JobView43Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView43Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView43Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
