import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView29Component } from './announcement-view29.component';

describe('AnnouncementView29Component', () => {
  let component: AnnouncementView29Component;
  let fixture: ComponentFixture<AnnouncementView29Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView29Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView29Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
