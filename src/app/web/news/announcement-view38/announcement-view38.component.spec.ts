import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView38Component } from './announcement-view38.component';

describe('AnnouncementView38Component', () => {
  let component: AnnouncementView38Component;
  let fixture: ComponentFixture<AnnouncementView38Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView38Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView38Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
