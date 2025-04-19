import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilAssistantComponent } from './edit-profil-assistant.component';

describe('EditProfilAssistantComponent', () => {
  let component: EditProfilAssistantComponent;
  let fixture: ComponentFixture<EditProfilAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfilAssistantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfilAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
