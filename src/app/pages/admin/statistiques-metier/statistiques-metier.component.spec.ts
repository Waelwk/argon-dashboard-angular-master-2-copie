import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesMetierComponent } from './statistiques-metier.component';

describe('StatistiquesMetierComponent', () => {
  let component: StatistiquesMetierComponent;
  let fixture: ComponentFixture<StatistiquesMetierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiquesMetierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiquesMetierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
