import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView21Component } from './announcement-view21.component';

describe('AnnouncementView21Component', () => {
  let component: AnnouncementView21Component;
  let fixture: ComponentFixture<AnnouncementView21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView21Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
