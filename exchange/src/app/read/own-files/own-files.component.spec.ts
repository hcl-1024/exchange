import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnFilesComponent } from './own-files.component';

describe('OwnFilesComponent', () => {
  let component: OwnFilesComponent;
  let fixture: ComponentFixture<OwnFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
