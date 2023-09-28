import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiorbeComponent } from './ciorbe.component';

describe('CiorbeComponent', () => {
  let component: CiorbeComponent;
  let fixture: ComponentFixture<CiorbeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiorbeComponent]
    });
    fixture = TestBed.createComponent(CiorbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
