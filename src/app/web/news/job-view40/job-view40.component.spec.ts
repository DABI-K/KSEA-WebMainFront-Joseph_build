import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView40Component } from './job-view40.component';

describe('JobView40Component', () => {
  let component: JobView40Component;
  let fixture: ComponentFixture<JobView40Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView40Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView40Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
