import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalGComponent } from './technical-g.component';

describe('TechnicalGComponent', () => {
  let component: TechnicalGComponent;
  let fixture: ComponentFixture<TechnicalGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
