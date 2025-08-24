export type Region = 'NA' | 'EU';

export interface CarEntry {
  id: string;
  name: string;
  region: Region;
  codes: string[];
  imageUrl: string;
}
