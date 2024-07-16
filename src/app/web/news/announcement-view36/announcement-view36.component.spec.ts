import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView36Component } from './announcement-view36.component';

describe('AnnouncementView36Component', () => {
  let component: AnnouncementView36Component;
  let fixture: ComponentFixture<AnnouncementView36Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView36Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView36Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
