import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView35Component } from './media-view35.component';

describe('MediaView35Component', () => {
  let component: MediaView35Component;
  let fixture: ComponentFixture<MediaView35Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView35Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView35Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
