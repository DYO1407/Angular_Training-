import { Mortgage } from './mortgage.model';

export interface PropertyShare {
  id: number;
  ownerName: string; // z. B. Person oder Firma
  sharePercentage: number; // z. B. 50 für 50%
  mortgages: Mortgage[];
}
