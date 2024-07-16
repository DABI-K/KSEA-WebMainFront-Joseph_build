import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView45Component } from './announcement-view45.component';

describe('AnnouncementView45Component', () => {
  let component: AnnouncementView45Component;
  let fixture: ComponentFixture<AnnouncementView45Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView45Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView45Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
