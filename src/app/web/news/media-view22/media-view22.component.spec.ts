import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView22Component } from './media-view22.component';

describe('MediaView22Component', () => {
  let component: MediaView22Component;
  let fixture: ComponentFixture<MediaView22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView22Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
