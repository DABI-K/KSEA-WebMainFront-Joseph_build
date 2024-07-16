import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView80Component } from './announcement-view80.component';

describe('AnnouncementView80Component', () => {
  let component: AnnouncementView80Component;
  let fixture: ComponentFixture<AnnouncementView80Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView80Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView80Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
