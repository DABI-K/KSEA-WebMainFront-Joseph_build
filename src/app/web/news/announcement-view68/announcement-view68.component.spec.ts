import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView68Component } from './announcement-view68.component';

describe('AnnouncementView68Component', () => {
  let component: AnnouncementView68Component;
  let fixture: ComponentFixture<AnnouncementView68Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView68Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView68Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
