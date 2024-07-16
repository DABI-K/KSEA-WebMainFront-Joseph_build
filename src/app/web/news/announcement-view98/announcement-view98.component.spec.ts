import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView98Component } from './announcement-view98.component';

describe('AnnouncementView98Component', () => {
  let component: AnnouncementView98Component;
  let fixture: ComponentFixture<AnnouncementView98Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView98Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView98Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
