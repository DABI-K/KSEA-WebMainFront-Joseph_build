import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView15Component } from './announcement-view15.component';

describe('AnnouncementView15Component', () => {
  let component: AnnouncementView15Component;
  let fixture: ComponentFixture<AnnouncementView15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView15Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
