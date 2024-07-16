import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView22Component } from './announcement-view22.component';

describe('AnnouncementView22Component', () => {
  let component: AnnouncementView22Component;
  let fixture: ComponentFixture<AnnouncementView22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView22Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
