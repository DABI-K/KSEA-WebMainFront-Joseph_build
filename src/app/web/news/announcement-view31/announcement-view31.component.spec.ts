import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView31Component } from './announcement-view31.component';

describe('AnnouncementView31Component', () => {
  let component: AnnouncementView31Component;
  let fixture: ComponentFixture<AnnouncementView31Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView31Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
