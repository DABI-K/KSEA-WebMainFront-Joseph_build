import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaView42Component } from './media-view42.component';

describe('MediaView42Component', () => {
  let component: MediaView42Component;
  let fixture: ComponentFixture<MediaView42Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaView42Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaView42Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
