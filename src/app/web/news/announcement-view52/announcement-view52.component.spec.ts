import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView52Component } from './announcement-view52.component';

describe('AnnouncementView52Component', () => {
  let component: AnnouncementView52Component;
  let fixture: ComponentFixture<AnnouncementView52Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView52Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView52Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
