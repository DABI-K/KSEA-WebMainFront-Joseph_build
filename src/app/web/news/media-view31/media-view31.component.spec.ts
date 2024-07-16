import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView31Component } from './media-view31.component';

describe('MediaView31Component', () => {
  let component: MediaView31Component;
  let fixture: ComponentFixture<MediaView31Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView31Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
