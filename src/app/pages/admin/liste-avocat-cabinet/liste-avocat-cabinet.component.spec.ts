import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAvocatCabinetComponent } from './liste-avocat-cabinet.component';

describe('ListeAvocatCabinetComponent', () => {
  let component: ListeAvocatCabinetComponent;
  let fixture: ComponentFixture<ListeAvocatCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAvocatCabinetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAvocatCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
