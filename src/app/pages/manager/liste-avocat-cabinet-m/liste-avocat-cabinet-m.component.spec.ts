import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAvocatCabinetMComponent } from './liste-avocat-cabinet-m.component';

describe('ListeAvocatCabinetMComponent', () => {
  let component: ListeAvocatCabinetMComponent;
  let fixture: ComponentFixture<ListeAvocatCabinetMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAvocatCabinetMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAvocatCabinetMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
