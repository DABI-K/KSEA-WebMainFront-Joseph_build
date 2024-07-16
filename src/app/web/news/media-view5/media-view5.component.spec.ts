import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView5Component } from './media-view5.component';

describe('MediaView5Component', () => {
  let component: MediaView5Component;
  let fixture: ComponentFixture<MediaView5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
