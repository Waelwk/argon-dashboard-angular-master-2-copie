import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCComponent } from './chat-c.component';

describe('ChatCComponent', () => {
  let component: ChatCComponent;
  let fixture: ComponentFixture<ChatCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
