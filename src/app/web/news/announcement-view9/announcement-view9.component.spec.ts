import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView9Component } from './announcement-view9.component';

describe('AnnouncementView9Component', () => {
  let component: AnnouncementView9Component;
  let fixture: ComponentFixture<AnnouncementView9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView9Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
