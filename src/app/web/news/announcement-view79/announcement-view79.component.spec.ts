import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView79Component } from './announcement-view79.component';

describe('AnnouncementView79Component', () => {
  let component: AnnouncementView79Component;
  let fixture: ComponentFixture<AnnouncementView79Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView79Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView79Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
