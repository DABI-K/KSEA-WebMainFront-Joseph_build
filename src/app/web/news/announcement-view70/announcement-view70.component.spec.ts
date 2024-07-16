import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView70Component } from './announcement-view70.component';

describe('AnnouncementView70Component', () => {
  let component: AnnouncementView70Component;
  let fixture: ComponentFixture<AnnouncementView70Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView70Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView70Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
