import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView37Component } from './media-view37.component';

describe('MediaView37Component', () => {
  let component: MediaView37Component;
  let fixture: ComponentFixture<MediaView37Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView37Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView37Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
