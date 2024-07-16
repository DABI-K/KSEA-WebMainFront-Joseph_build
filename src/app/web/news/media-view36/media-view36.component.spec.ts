import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView36Component } from './media-view36.component';

describe('MediaView36Component', () => {
  let component: MediaView36Component;
  let fixture: ComponentFixture<MediaView36Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView36Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView36Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
