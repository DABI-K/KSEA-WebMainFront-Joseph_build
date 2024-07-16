import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementView92Component } from './announcement-view92.component';

describe('AnnouncementView92Component', () => {
  let component: AnnouncementView92Component;
  let fixture: ComponentFixture<AnnouncementView92Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementView92Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementView92Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
