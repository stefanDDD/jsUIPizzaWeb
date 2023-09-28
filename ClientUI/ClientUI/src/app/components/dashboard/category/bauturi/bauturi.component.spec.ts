import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BauturiComponent } from './bauturi.component';

describe('BauturiComponent', () => {
  let component: BauturiComponent;
  let fixture: ComponentFixture<BauturiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BauturiComponent]
    });
    fixture = TestBed.createComponent(BauturiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
