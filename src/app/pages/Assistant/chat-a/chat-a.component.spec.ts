import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAComponent } from './chat-a.component';

describe('ChatAComponent', () => {
  let component: ChatAComponent;
  let fixture: ComponentFixture<ChatAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
