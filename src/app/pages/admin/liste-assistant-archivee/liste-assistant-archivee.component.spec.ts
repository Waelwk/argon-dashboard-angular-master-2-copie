import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAssistantArchiveeComponent } from './liste-assistant-archivee.component';

describe('ListeAssistantArchiveeComponent', () => {
  let component: ListeAssistantArchiveeComponent;
  let fixture: ComponentFixture<ListeAssistantArchiveeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAssistantArchiveeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAssistantArchiveeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
