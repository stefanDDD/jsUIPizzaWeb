import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCartComponent } from './error-cart.component';

describe('ErrorCartComponent', () => {
  let component: ErrorCartComponent;
  let fixture: ComponentFixture<ErrorCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorCartComponent]
    });
    fixture = TestBed.createComponent(ErrorCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
