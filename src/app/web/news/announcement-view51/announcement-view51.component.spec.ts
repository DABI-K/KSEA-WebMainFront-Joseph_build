import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView51Component } from './announcement-view51.component';

describe('AnnouncementView51Component', () => {
  let component: AnnouncementView51Component;
  let fixture: ComponentFixture<AnnouncementView51Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView51Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView51Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
