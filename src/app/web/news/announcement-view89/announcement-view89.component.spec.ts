import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView89Component } from './announcement-view89.component';

describe('AnnouncementView89Component', () => {
  let component: AnnouncementView89Component;
  let fixture: ComponentFixture<AnnouncementView89Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView89Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView89Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
