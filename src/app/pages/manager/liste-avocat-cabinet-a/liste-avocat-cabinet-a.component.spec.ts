import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAvocatCabinetAComponent } from './liste-avocat-cabinet-a.component';

describe('ListeAvocatCabinetAComponent', () => {
  let component: ListeAvocatCabinetAComponent;
  let fixture: ComponentFixture<ListeAvocatCabinetAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAvocatCabinetAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAvocatCabinetAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
