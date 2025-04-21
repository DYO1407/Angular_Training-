import { Component, OnInit } from '@angular/core';
import { Property } from '../Models/property.model';
import { PropertyShare } from '../Models/property-share.model';
import { Mortgage } from '../Models/mortgage.model';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
 syncEnabled = true;



 ngOnInit() {
  const mortgageA1 = this.property.shares[0].mortgages[0];
  const mortgageA2 = this.property.shares[1].mortgages[0];

  console.log('Are both shares using the same mortgage?', mortgageA1 === mortgageA2);
}

 mortgage1: Mortgage = {
  id: 1,
  rank: 1,
  betrag: 150000,
  belastung: 'Grundschuld',
  isSelectedForImport: false
};

mortgage2: Mortgage = {
  id: 2,
  rank: 2,
  betrag: 80000,
  belastung: 'Hypothek',
  isSelectedForImport: false
};

mortgage3: Mortgage = {
  id: 3,
  rank: 3,
  betrag: 40000,
  belastung: 'Pfandrecht',
  isSelectedForImport: false
};


property: Property = {
  id: 1,
  address: 'Musterstraße 123, 12345 Berlin',
  type: 'Wohnung',
  shares: [
    {
      id: 1,
      ownerName: 'Max Mustermann',
      sharePercentage: 50,
      mortgages: [this.mortgage1, this.mortgage2]
    },
    {
      id: 2,
      ownerName: 'Erika Musterfrau',
      sharePercentage: 50,
      mortgages: [this.mortgage1, this.mortgage3]
    }
  ]
};



}
