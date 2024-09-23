import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneAccountComponent } from './one-account.component';

describe('OneAccountComponent', () => {
  let component: OneAccountComponent;
  let fixture: ComponentFixture<OneAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
