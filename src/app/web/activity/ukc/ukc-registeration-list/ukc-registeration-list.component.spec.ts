import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkcRegisterationListComponent } from './ukc-registeration-list.component';

describe('UkcRegisterationListComponent', () => {
  let component: UkcRegisterationListComponent;
  let fixture: ComponentFixture<UkcRegisterationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UkcRegisterationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkcRegisterationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
