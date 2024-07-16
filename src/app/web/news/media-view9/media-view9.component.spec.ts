import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView9Component } from './media-view9.component';

describe('MediaView9Component', () => {
  let component: MediaView9Component;
  let fixture: ComponentFixture<MediaView9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView9Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
