import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView64Component } from './announcement-view64.component';

describe('AnnouncementView64Component', () => {
  let component: AnnouncementView64Component;
  let fixture: ComponentFixture<AnnouncementView64Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView64Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView64Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
