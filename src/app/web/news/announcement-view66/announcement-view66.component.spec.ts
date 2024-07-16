import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView66Component } from './announcement-view66.component';

describe('AnnouncementView66Component', () => {
  let component: AnnouncementView66Component;
  let fixture: ComponentFixture<AnnouncementView66Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView66Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView66Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
