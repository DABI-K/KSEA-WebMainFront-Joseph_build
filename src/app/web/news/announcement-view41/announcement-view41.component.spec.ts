import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView41Component } from './announcement-view41.component';

describe('AnnouncementView41Component', () => {
  let component: AnnouncementView41Component;
  let fixture: ComponentFixture<AnnouncementView41Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView41Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView41Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
