import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupItemComponent } from './signup-item.component';

describe('SignupComponent', () => {
  let component: SignupItemComponent;
  let fixture: ComponentFixture<SignupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
