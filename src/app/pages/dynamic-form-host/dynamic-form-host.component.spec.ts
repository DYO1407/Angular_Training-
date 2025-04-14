import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormHostComponent } from './dynamic-form-host.component';

describe('DynamicFormHostComponent', () => {
  let component: DynamicFormHostComponent;
  let fixture: ComponentFixture<DynamicFormHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFormHostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicFormHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
