import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView25Component } from './announcement-view25.component';

describe('AnnouncementView25Component', () => {
  let component: AnnouncementView25Component;
  let fixture: ComponentFixture<AnnouncementView25Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView25Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
