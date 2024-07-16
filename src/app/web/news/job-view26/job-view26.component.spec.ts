import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobView26Component } from './job-view26.component';

describe('JobView26Component', () => {
  let component: JobView26Component;
  let fixture: ComponentFixture<JobView26Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobView26Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobView26Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
