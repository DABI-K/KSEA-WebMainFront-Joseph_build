import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView86Component } from './announcement-view86.component';

describe('AnnouncementView86Component', () => {
  let component: AnnouncementView86Component;
  let fixture: ComponentFixture<AnnouncementView86Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView86Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView86Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
