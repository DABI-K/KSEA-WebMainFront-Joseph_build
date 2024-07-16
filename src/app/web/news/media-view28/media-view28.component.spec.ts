import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView28Component } from './media-view28.component';

describe('MediaView28Component', () => {
  let component: MediaView28Component;
  let fixture: ComponentFixture<MediaView28Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView28Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView28Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
