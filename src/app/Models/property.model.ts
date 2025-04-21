
import { PropertyShare } from './property-share.model';

export interface Property {
  id: number;
  address: string;
  type: string; // z. B. „Wohnung“, „Haus“
  shares: PropertyShare[];
}
