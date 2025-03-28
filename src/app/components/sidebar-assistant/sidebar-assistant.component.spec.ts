import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAssistantComponent } from './sidebar-assistant.component';

describe('SidebarAssistantComponent', () => {
  let component: SidebarAssistantComponent;
  let fixture: ComponentFixture<SidebarAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarAssistantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
