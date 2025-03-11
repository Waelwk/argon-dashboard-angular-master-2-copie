import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedossierAvocatComponent } from './listedossier-avocat.component';

describe('ListedossierAvocatComponent', () => {
  let component: ListedossierAvocatComponent;
  let fixture: ComponentFixture<ListedossierAvocatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListedossierAvocatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListedossierAvocatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
