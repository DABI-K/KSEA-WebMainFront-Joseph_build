import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView5Component } from './announcement-view5.component';

describe('AnnouncementView5Component', () => {
  let component: AnnouncementView5Component;
  let fixture: ComponentFixture<AnnouncementView5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
