import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView23Component } from './announcement-view23.component';

describe('AnnouncementView23Component', () => {
  let component: AnnouncementView23Component;
  let fixture: ComponentFixture<AnnouncementView23Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView23Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
