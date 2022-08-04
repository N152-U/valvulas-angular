export class valveModel {
  id: string; 
  sectorId: number;
  sector:string;
  settlementId: number;
  municipality: string;
  diameterId: number;
  valveTypeId: number;
  valveLocationId: number;
  roadId: number;
  street: string;
  corner: string;
  btwFirstStreet: string;
  btwSecondStreet: string;
  reference: string;
  photo: Blob;
  settlement: {municipality_id:number};
  road: any;
  diameter:any;
  valves_location:any;
  cve_sec :string;
  name: string;
  location: string;
  type: string;
  valves_type: string;
  directionClose: any;
  photos:any;
  "settlement.settlement":string;
  "settlement.d_mnpio":string;
  "sector.cve_sec":string
}