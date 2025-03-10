import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAssistatnCabinetComponent } from './liste-assistatn-cabinet.component';

describe('ListeAssistatnCabinetComponent', () => {
  let component: ListeAssistatnCabinetComponent;
  let fixture: ComponentFixture<ListeAssistatnCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAssistatnCabinetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAssistatnCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
