import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView77Component } from './announcement-view77.component';

describe('AnnouncementView77Component', () => {
  let component: AnnouncementView77Component;
  let fixture: ComponentFixture<AnnouncementView77Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView77Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView77Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
