import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView7Component } from './media-view7.component';

describe('MediaView7Component', () => {
  let component: MediaView7Component;
  let fixture: ComponentFixture<MediaView7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
