import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }]
})
export class CheckboxComponent implements ControlValueAccessor {
  value: boolean = false;

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // onChangeEvent(event: Event): void {
  //   const checked = (event.target as HTMLInputElement).checked;
  //   this.value = checked;
  //   this.onChange(checked);
  //   this.onTouched();
  // }

  @Output() valueChanged = new EventEmitter<boolean>();
}
