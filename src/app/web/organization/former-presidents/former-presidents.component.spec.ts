import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormerPresidentsComponent } from './former-presidents.component';

describe('FormerPresidentsComponent', () => {
  let component: FormerPresidentsComponent;
  let fixture: ComponentFixture<FormerPresidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormerPresidentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormerPresidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
