import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView74Component } from './announcement-view74.component';

describe('AnnouncementView74Component', () => {
  let component: AnnouncementView74Component;
  let fixture: ComponentFixture<AnnouncementView74Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView74Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView74Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
