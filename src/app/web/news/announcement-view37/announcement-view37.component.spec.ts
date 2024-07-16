import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView37Component } from './announcement-view37.component';

describe('AnnouncementView37Component', () => {
  let component: AnnouncementView37Component;
  let fixture: ComponentFixture<AnnouncementView37Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView37Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView37Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
