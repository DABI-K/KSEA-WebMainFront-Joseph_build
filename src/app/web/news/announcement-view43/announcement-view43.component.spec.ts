import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView43Component } from './announcement-view43.component';

describe('AnnouncementView43Component', () => {
  let component: AnnouncementView43Component;
  let fixture: ComponentFixture<AnnouncementView43Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView43Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView43Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
