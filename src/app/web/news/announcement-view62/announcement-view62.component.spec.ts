import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView62Component } from './announcement-view62.component';

describe('AnnouncementView62Component', () => {
  let component: AnnouncementView62Component;
  let fixture: ComponentFixture<AnnouncementView62Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView62Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView62Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
