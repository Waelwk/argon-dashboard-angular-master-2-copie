import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDossierAvocatAssistantComponent } from './liste-dossier-avocat-assistant.component';

describe('ListeDossierAvocatAssistantComponent', () => {
  let component: ListeDossierAvocatAssistantComponent;
  let fixture: ComponentFixture<ListeDossierAvocatAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDossierAvocatAssistantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDossierAvocatAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
