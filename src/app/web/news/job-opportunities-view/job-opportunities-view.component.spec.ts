import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOpportunitiesViewComponent } from './job-opportunities-view.component';

describe('JobOpportunitiesViewComponent', () => {
  let component: JobOpportunitiesViewComponent;
  let fixture: ComponentFixture<JobOpportunitiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOpportunitiesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOpportunitiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
