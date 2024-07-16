import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilorsComponent } from './councilors.component';

describe('CouncilorsComponent', () => {
  let component: CouncilorsComponent;
  let fixture: ComponentFixture<CouncilorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouncilorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouncilorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
