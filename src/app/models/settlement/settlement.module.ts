/* eslint-disable @typescript-eslint/ban-types */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SettlementModule {
  id: Number;
  settlement: String;
  d_cp: number;
  zip_code:number;
 }
