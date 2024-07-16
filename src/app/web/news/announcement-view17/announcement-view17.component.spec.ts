import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView17Component } from './announcement-view17.component';

describe('AnnouncementView17Component', () => {
  let component: AnnouncementView17Component;
  let fixture: ComponentFixture<AnnouncementView17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView17Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
