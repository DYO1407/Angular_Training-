import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectallCheckboxComponent } from './selectall-checkbox.component';

describe('SelectallCheckboxComponent', () => {
  let component: SelectallCheckboxComponent;
  let fixture: ComponentFixture<SelectallCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectallCheckboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectallCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
