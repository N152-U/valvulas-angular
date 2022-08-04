/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable linebreak-style */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from "@angular/router";
import { ValveComponent } from '../valve/valve.component';
import { ValveService } from '@app/services/valve/valve.service';
import { valveModel } from '@app/models/valve/valve.module';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-valve-table',
  templateUrl: './valve-table.component.html',
  styleUrls: ['./valve-table.component.scss']
})
export class ValveTableComponent implements OnInit {

  first = 0;
  valveDate: valveModel[] = [];
  cargando = false;
  loadingTable=true;
  totalRecords:Number=0;

  constructor(
    private apiValve: ValveService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.cargar();
    this.loadValves(null);
  }

  cargar() {
    this.cargando = true;

  }

  deleteValve(valve: valveModel, i: number) {
    Swal.fire({
      title: '¿Está seguro?',
      type: 'question',
      text: `¿Qué desea borrar la valvula con el Id: ${valve.id}?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    } as SweetAlertOptions).then(resp => {
      if (resp.value) {
        this.valveDate.splice(i, 1);
        this.apiValve.deletevalves(valve.id).subscribe();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Vàlvula eliminada",
          showConfirmButton: false,
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }

  editValve(valve: valveModel): void {
    localStorage.setItem("id", valve.id.toString());
    this.router.navigate(["edit"]);
  }

  loadValves(event: LazyLoadEvent)
  {
    console.log(event);
    if(event)
    {
      this.loadingTable = true;
      this.apiValve.getTotalRegisters(event.first, event.rows,event.filters["settlement.settlement_municipality.municipality"]?.value, event.filters["settlement.settlement"]?.value,  event.filters["createAtnew"]?.value, event.filters["street"]?.value, event.filters["sector.cve_sec"]?.value).subscribe(res => {
        this.totalRecords=res.payload;
      });
      setTimeout(() => {
        this.apiValve.getAllValves(event.first, event.rows,event.filters["settlement.settlement_municipality.municipality"]?.value, event.filters["settlement.settlement"]?.value,  event.filters["createAtnew"]?.value, event.filters["street"]?.value, event.filters["sector.cve_sec"]?.value).subscribe(res => {
          this.valveDate = res.payload;
          this.loadingTable = false;
        });
      }, 1000);
    }
  
   
  }

}