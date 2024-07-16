import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView23Component } from './media-view23.component';

describe('MediaView23Component', () => {
  let component: MediaView23Component;
  let fixture: ComponentFixture<MediaView23Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView23Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
