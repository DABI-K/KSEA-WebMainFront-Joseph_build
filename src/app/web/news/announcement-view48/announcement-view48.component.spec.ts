import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView48Component } from './announcement-view48.component';

describe('AnnouncementView48Component', () => {
  let component: AnnouncementView48Component;
  let fixture: ComponentFixture<AnnouncementView48Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView48Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView48Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
