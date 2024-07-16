import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView7Component } from './announcement-view7.component';

describe('AnnouncementView7Component', () => {
  let component: AnnouncementView7Component;
  let fixture: ComponentFixture<AnnouncementView7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
