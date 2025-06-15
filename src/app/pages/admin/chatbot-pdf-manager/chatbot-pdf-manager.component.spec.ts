import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotPdfManagerComponent } from './chatbot-pdf-manager.component';

describe('ChatbotPdfManagerComponent', () => {
  let component: ChatbotPdfManagerComponent;
  let fixture: ComponentFixture<ChatbotPdfManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotPdfManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotPdfManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
