import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileManagerComponent } from './edit-profile-manager.component';

describe('EditProfileManagerComponent', () => {
  let component: EditProfileManagerComponent;
  let fixture: ComponentFixture<EditProfileManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
