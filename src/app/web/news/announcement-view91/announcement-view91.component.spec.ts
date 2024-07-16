import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView91Component } from './announcement-view91.component';

describe('AnnouncementView91Component', () => {
  let component: AnnouncementView91Component;
  let fixture: ComponentFixture<AnnouncementView91Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView91Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView91Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
