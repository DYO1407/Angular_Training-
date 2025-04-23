import { Component, Input } from '@angular/core';
import { PropertyShare } from '../Models/property-share.model';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent {
  @Input() share!: PropertyShare;
  @Input() syncEnabled: boolean = true;

  selectAll: boolean = false;




  toggleAll(checked: boolean): void {
    this.selectAll = checked;
    this.share.mortgages.forEach(m => {
      if (this.syncEnabled) {
        m.isSelectedForImport = checked;
      }

    });
  }

}
