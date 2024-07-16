import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView26Component } from './announcement-view26.component';

describe('AnnouncementView26Component', () => {
  let component: AnnouncementView26Component;
  let fixture: ComponentFixture<AnnouncementView26Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView26Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView26Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
