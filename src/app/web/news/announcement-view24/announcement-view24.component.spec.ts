import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView24Component } from './announcement-view24.component';

describe('AnnouncementView24Component', () => {
  let component: AnnouncementView24Component;
  let fixture: ComponentFixture<AnnouncementView24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView24Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
