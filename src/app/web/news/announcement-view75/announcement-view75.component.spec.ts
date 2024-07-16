import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView75Component } from './announcement-view75.component';

describe('AnnouncementView75Component', () => {
  let component: AnnouncementView75Component;
  let fixture: ComponentFixture<AnnouncementView75Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView75Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView75Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
