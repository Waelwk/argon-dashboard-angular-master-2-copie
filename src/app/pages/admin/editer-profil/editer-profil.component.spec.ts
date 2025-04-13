import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerProfilComponent } from './editer-profil.component';

describe('EditerProfilComponent', () => {
  let component: EditerProfilComponent;
  let fixture: ComponentFixture<EditerProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditerProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditerProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
