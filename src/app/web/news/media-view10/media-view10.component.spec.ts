import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView10Component } from './media-view10.component';

describe('MediaView10Component', () => {
  let component: MediaView10Component;
  let fixture: ComponentFixture<MediaView10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView10Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
