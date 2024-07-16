import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView55Component } from './announcement-view55.component';

describe('AnnouncementView55Component', () => {
  let component: AnnouncementView55Component;
  let fixture: ComponentFixture<AnnouncementView55Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView55Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView55Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
