import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView15Component } from './media-view15.component';

describe('MediaView15Component', () => {
  let component: MediaView15Component;
  let fixture: ComponentFixture<MediaView15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView15Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
