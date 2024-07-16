import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView61Component } from './announcement-view61.component';

describe('AnnouncementView61Component', () => {
  let component: AnnouncementView61Component;
  let fixture: ComponentFixture<AnnouncementView61Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView61Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView61Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
