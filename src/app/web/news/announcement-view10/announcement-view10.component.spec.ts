import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView10Component } from './announcement-view10.component';

describe('AnnouncementView10Component', () => {
  let component: AnnouncementView10Component;
  let fixture: ComponentFixture<AnnouncementView10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView10Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
