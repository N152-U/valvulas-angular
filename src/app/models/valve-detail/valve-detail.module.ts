import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ValveDetailModel {

  id: String; 
  street: string;
  corner: string;
  btwFirstStreet: string;
  btwSecondStreet: string;
  reference: string;
  photo: Blob;
  settlement:{settlement:string};
  valves_type: string;
  d_mnpio: string;
  valves_location:string;
  sector:{cve_sec:string};
  road: string;
  diameter:number;
  valveType: String;
  cve_sec :String;
  name: string;
  location: string;
  type: string;
  directionClose: boolean;
  latitude: number;
  longitude: number;
  "diameter.diameter":number;
  "diameter.id":number;
  "photos.data":string;
  "road.type":string;
  "sector.cve_sec":string;
  "settlement.settlement":string;
  "settlement.settlement_municipality.id":number;
  "settlement.settlement_municipality.municipality":string;
  "valves_location.location":string;
  "valves_type.type":string;


 }
