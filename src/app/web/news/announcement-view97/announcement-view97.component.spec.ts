import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView97Component } from './announcement-view97.component';

describe('AnnouncementView97Component', () => {
  let component: AnnouncementView97Component;
  let fixture: ComponentFixture<AnnouncementView97Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView97Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView97Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
