import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KseaLetterComponent } from './ksea-letter.component';

describe('KseaLetterComponent', () => {
  let component: KseaLetterComponent;
  let fixture: ComponentFixture<KseaLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KseaLetterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KseaLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
