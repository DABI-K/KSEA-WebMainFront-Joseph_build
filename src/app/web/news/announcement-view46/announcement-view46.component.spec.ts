import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView46Component } from './announcement-view46.component';

describe('AnnouncementView46Component', () => {
  let component: AnnouncementView46Component;
  let fixture: ComponentFixture<AnnouncementView46Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView46Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView46Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
