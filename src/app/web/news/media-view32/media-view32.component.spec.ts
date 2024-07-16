import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView32Component } from './media-view32.component';

describe('MediaView32Component', () => {
  let component: MediaView32Component;
  let fixture: ComponentFixture<MediaView32Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView32Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView32Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
