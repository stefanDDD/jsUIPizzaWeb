import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntreuriComponent } from './antreuri.component';

describe('AntreuriComponent', () => {
  let component: AntreuriComponent;
  let fixture: ComponentFixture<AntreuriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AntreuriComponent]
    });
    fixture = TestBed.createComponent(AntreuriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
