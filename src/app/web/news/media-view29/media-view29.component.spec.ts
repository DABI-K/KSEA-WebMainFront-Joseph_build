import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView29Component } from './media-view29.component';

describe('MediaView29Component', () => {
  let component: MediaView29Component;
  let fixture: ComponentFixture<MediaView29Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView29Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView29Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
