import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierUpdateAssistantComponent } from './dossier-update-assistant.component';

describe('DossierUpdateAssistantComponent', () => {
  let component: DossierUpdateAssistantComponent;
  let fixture: ComponentFixture<DossierUpdateAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierUpdateAssistantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierUpdateAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
