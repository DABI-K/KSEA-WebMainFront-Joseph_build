import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView21Component } from './media-view21.component';

describe('MediaView21Component', () => {
  let component: MediaView21Component;
  let fixture: ComponentFixture<MediaView21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView21Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
