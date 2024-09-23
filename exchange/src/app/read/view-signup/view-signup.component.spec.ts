import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignupComponent } from './view-signup.component';

describe('ViewSignupComponent', () => {
  let component: ViewSignupComponent;
  let fixture: ComponentFixture<ViewSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
