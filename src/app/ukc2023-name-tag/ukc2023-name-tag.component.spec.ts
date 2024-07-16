import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ukc2023NameTagComponent } from './ukc2023-name-tag.component';

describe('Ukc2023NameTagComponent', () => {
  let component: Ukc2023NameTagComponent;
  let fixture: ComponentFixture<Ukc2023NameTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ukc2023NameTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ukc2023NameTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
