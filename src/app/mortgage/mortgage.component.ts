import { Component, Input, OnInit } from '@angular/core';
import { Mortgage } from '../Models/mortgage.model';

@Component({
  selector: 'app-mortgage',
  templateUrl: './mortgage.component.html',
  styleUrls: ['./mortgage.component.css']
})
export class MortgageComponent implements OnInit {
  @Input() mortgage!: Mortgage;
  @Input() syncEnabled: boolean = true;

  localValue = false;
  // setTrue: boolean = true;





  ngOnInit() {
  }



 public onSelectedForImport(newValue: boolean) {
    console.log(
      `Mortgage ID ${this.mortgage.id} – new value: ${newValue}`
    );
  }



  onCheckboxChange(checked: boolean): void {
    if (this.syncEnabled) {
      this.mortgage.isSelectedForImport = checked;
    }

    console.log(
      `Mortgage ID ${this.mortgage.id} – clicked: ${checked}, saved: ${this.mortgage.isSelectedForImport}`
    );
  }


}
