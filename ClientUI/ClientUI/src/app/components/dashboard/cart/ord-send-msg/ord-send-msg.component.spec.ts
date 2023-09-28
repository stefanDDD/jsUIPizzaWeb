import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdSendMsgComponent } from './ord-send-msg.component';

describe('OrdSendMsgComponent', () => {
  let component: OrdSendMsgComponent;
  let fixture: ComponentFixture<OrdSendMsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdSendMsgComponent]
    });
    fixture = TestBed.createComponent(OrdSendMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
