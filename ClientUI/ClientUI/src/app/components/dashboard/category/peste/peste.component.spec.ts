import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesteComponent } from './peste.component';

describe('PesteComponent', () => {
  let component: PesteComponent;
  let fixture: ComponentFixture<PesteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PesteComponent]
    });
    fixture = TestBed.createComponent(PesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
