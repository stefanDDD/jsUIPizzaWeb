import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasteComponent } from './paste.component';

describe('PasteComponent', () => {
  let component: PasteComponent;
  let fixture: ComponentFixture<PasteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasteComponent]
    });
    fixture = TestBed.createComponent(PasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
