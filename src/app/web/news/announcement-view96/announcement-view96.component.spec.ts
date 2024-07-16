import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView96Component } from './announcement-view96.component';

describe('AnnouncementView96Component', () => {
  let component: AnnouncementView96Component;
  let fixture: ComponentFixture<AnnouncementView96Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView96Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView96Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
