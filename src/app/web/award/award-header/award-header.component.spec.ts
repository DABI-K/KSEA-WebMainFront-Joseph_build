import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardHeaderComponent } from './award-header.component';

describe('AwardHeaderComponent', () => {
  let component: AwardHeaderComponent;
  let fixture: ComponentFixture<AwardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
