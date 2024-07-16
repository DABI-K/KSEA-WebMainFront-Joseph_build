import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyholderComponent } from './keyholder.component';

describe('KeyholderComponent', () => {
  let component: KeyholderComponent;
  let fixture: ComponentFixture<KeyholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
