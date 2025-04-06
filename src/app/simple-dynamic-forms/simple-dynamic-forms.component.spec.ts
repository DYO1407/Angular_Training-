import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDynamicFormsComponent } from './simple-dynamic-forms.component';

describe('SimpleDynamicFormsComponent', () => {
  let component: SimpleDynamicFormsComponent;
  let fixture: ComponentFixture<SimpleDynamicFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleDynamicFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleDynamicFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
