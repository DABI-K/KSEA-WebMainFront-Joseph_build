import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView24Component } from './media-view24.component';

describe('MediaView24Component', () => {
  let component: MediaView24Component;
  let fixture: ComponentFixture<MediaView24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView24Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
