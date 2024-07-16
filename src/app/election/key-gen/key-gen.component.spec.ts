import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyGenComponent } from './key-gen.component';

describe('KeyGenComponent', () => {
  let component: KeyGenComponent;
  let fixture: ComponentFixture<KeyGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyGenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
