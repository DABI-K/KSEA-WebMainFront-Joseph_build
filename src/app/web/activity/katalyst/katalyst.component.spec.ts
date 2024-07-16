import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatalystComponent } from './katalyst.component';

describe('KatalystComponent', () => {
  let component: KatalystComponent;
  let fixture: ComponentFixture<KatalystComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KatalystComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KatalystComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
