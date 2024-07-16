import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView72Component } from './announcement-view72.component';

describe('AnnouncementView72Component', () => {
  let component: AnnouncementView72Component;
  let fixture: ComponentFixture<AnnouncementView72Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView72Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView72Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
