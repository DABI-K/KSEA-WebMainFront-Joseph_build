import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView25Component } from './media-view25.component';

describe('MediaView25Component', () => {
  let component: MediaView25Component;
  let fixture: ComponentFixture<MediaView25Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView25Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
