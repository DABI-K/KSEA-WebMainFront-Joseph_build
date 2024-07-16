import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView22Component } from './job-view22.component';

describe('JobView22Component', () => {
  let component: JobView22Component;
  let fixture: ComponentFixture<JobView22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView22Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
