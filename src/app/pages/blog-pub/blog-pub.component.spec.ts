import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPubComponent } from './blog-pub.component';

describe('BlogPubComponent', () => {
  let component: BlogPubComponent;
  let fixture: ComponentFixture<BlogPubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
