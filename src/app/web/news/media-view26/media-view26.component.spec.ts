import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView26Component } from './media-view26.component';

describe('MediaView26Component', () => {
  let component: MediaView26Component;
  let fixture: ComponentFixture<MediaView26Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView26Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView26Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
