import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAdComponent } from './chat-ad.component';

describe('ChatAdComponent', () => {
  let component: ChatAdComponent;
  let fixture: ComponentFixture<ChatAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatAdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
