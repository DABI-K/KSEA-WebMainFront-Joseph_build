import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView12Component } from './announcement-view12.component';

describe('AnnouncementView12Component', () => {
  let component: AnnouncementView12Component;
  let fixture: ComponentFixture<AnnouncementView12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView12Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
