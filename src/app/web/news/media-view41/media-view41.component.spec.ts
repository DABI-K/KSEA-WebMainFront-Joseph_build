import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView41Component } from './media-view41.component';

describe('MediaView41Component', () => {
  let component: MediaView41Component;
  let fixture: ComponentFixture<MediaView41Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView41Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView41Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
