import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView19Component } from './announcement-view19.component';

describe('AnnouncementView19Component', () => {
  let component: AnnouncementView19Component;
  let fixture: ComponentFixture<AnnouncementView19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView19Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
