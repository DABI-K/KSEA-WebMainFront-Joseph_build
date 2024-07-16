import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView76Component } from './announcement-view76.component';

describe('AnnouncementView76Component', () => {
  let component: AnnouncementView76Component;
  let fixture: ComponentFixture<AnnouncementView76Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView76Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView76Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
