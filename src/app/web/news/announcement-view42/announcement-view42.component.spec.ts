import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView42Component } from './announcement-view42.component';

describe('AnnouncementView42Component', () => {
  let component: AnnouncementView42Component;
  let fixture: ComponentFixture<AnnouncementView42Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView42Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView42Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
