/* eslint-disable linebreak-style */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]

})
export class ValveMovementModel { 
  id:number;
  valves_id: number;
  reasonId: number;
  otherReasons: string;
  observation: string;
  action: number;
  direction: number;
  reason:{reason:String, id:number};
  turns: number;
  full: number;
  createdBy: number;
  "settlement.settlement":string;
  reasons_id:number;
  length: number;
}
