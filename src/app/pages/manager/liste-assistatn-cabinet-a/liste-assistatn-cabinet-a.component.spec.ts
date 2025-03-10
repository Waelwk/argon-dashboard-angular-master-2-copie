import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAssistatnCabinetAComponent } from './liste-assistatn-cabinet-a.component';

describe('ListeAssistatnCabinetAComponent', () => {
  let component: ListeAssistatnCabinetAComponent;
  let fixture: ComponentFixture<ListeAssistatnCabinetAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAssistatnCabinetAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAssistatnCabinetAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
