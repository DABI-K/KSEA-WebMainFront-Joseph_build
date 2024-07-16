import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView65Component } from './announcement-view65.component';

describe('AnnouncementView65Component', () => {
  let component: AnnouncementView65Component;
  let fixture: ComponentFixture<AnnouncementView65Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView65Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView65Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
