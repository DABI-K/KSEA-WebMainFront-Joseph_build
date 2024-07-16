import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView99Component } from './announcement-view99.component';

describe('AnnouncementView99Component', () => {
  let component: AnnouncementView99Component;
  let fixture: ComponentFixture<AnnouncementView99Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView99Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView99Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
