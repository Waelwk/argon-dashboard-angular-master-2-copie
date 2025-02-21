import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAssistantComponent } from './liste-assistant.component';

describe('ListeAssistantComponent', () => {
  let component: ListeAssistantComponent;
  let fixture: ComponentFixture<ListeAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAssistantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
