import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView39Component } from './announcement-view39.component';

describe('AnnouncementView39Component', () => {
  let component: AnnouncementView39Component;
  let fixture: ComponentFixture<AnnouncementView39Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView39Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView39Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
