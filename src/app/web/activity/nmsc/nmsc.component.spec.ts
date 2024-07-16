import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmscComponent } from './nmsc.component';

describe('NmscComponent', () => {
  let component: NmscComponent;
  let fixture: ComponentFixture<NmscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmscComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NmscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
