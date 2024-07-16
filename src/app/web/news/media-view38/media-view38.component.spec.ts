import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView38Component } from './media-view38.component';

describe('MediaView38Component', () => {
  let component: MediaView38Component;
  let fixture: ComponentFixture<MediaView38Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView38Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView38Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
