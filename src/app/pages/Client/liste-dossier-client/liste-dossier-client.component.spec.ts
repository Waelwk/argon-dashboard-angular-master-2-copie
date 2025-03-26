import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDossierClientComponent } from './liste-dossier-client.component';

describe('ListeDossierClientComponent', () => {
  let component: ListeDossierClientComponent;
  let fixture: ComponentFixture<ListeDossierClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDossierClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDossierClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
