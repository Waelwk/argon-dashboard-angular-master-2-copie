import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMComponent } from './chat-m.component';

describe('ChatMComponent', () => {
  let component: ChatMComponent;
  let fixture: ComponentFixture<ChatMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
