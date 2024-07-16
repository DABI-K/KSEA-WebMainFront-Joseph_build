import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView63Component } from './announcement-view63.component';

describe('AnnouncementView63Component', () => {
  let component: AnnouncementView63Component;
  let fixture: ComponentFixture<AnnouncementView63Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView63Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView63Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
