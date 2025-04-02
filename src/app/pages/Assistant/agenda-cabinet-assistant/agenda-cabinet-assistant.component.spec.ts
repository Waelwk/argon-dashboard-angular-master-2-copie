import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaCabinetAssistantComponent } from './agenda-cabinet-assistant.component';

describe('AgendaCabinetAssistantComponent', () => {
  let component: AgendaCabinetAssistantComponent;
  let fixture: ComponentFixture<AgendaCabinetAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaCabinetAssistantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaCabinetAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
