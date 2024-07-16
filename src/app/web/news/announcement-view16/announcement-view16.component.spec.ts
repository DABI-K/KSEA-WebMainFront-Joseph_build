import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView16Component } from './announcement-view16.component';

describe('AnnouncementView16Component', () => {
  let component: AnnouncementView16Component;
  let fixture: ComponentFixture<AnnouncementView16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView16Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
