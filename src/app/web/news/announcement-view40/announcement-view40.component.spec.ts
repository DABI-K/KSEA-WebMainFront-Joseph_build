import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView40Component } from './announcement-view40.component';

describe('AnnouncementView40Component', () => {
  let component: AnnouncementView40Component;
  let fixture: ComponentFixture<AnnouncementView40Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView40Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView40Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
