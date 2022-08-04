import { valveModel } from '@app/models/valve/valve.module';
import { ValveService } from './../../../../services/valve/valve.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValveMovementModel } from '@app/models/valve-movement/valve-movement.module';
import { ValveMovementService } from '@app/services/valveMovement/valve-movement.service';
import { ValveDetailModel } from '@app/models/valve-detail/valve-detail.module';
import { DomSanitizer } from '@angular/platform-browser';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { LazyLoadEvent } from 'primeng/api';


@Component({
  selector: 'app-valves-detail',
  templateUrl: './valves-detail.component.html',
  styleUrls: ['./valves-detail.component.scss']
})
export class ValvesDetailComponent implements OnInit {
  first = 0;
  rows = 20;
  cargando = false;
  public valve : ValveDetailModel;
  public valveMovement : any;
  public imageurl;
  public totalMovements:Number = 0;
  valveMovements: valveModel[] = [];
  protected valvesId = this.route.snapshot.paramMap.get("id");
  protected valvesMovements = this.route.snapshot.paramMap.get("id");
  loadingTable=true;
  totalRecords:Number=0;

  constructor(
    private sanitizer:DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private apiValve: ValveService,
    private apiValveMovement: ValveMovementService,
  ) { }

  ngOnInit(): void {

    this.loadValves(null);

  
    this.apiValve.detailGetById(this.valvesId).subscribe((res) => {
     
   /*   console.log(res["photos.data"]) */

     this.imageurl=this.sanitizer.bypassSecurityTrustResourceUrl(res["photos.data"]);
     this.valve = res;
     console.log("Detalles",this.valve);

    });

  }

 

  deleteValveMovement(valve: valveModel, i: number) {
    Swal.fire({
      title: '¿Está seguro?',
      type: 'question',
      text: `¿Qué desea borrar el movimiento: ${valve.id}?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    } as SweetAlertOptions).then(resp => {
      if (resp.value) {
        this.valveMovements.splice(i, 1);
        this.apiValve.deletevalvesMovement(valve.id).subscribe();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Movimiento eliminado correctamente",
          showConfirmButton: false,
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }

  loadValves(event: LazyLoadEvent)
  {

    if(event){
      console.log(event);
      this.loadingTable = true;
      this.apiValve.getTotalRegistersMovement(this.valvesMovements, event.first, event.rows, event.filters["createAtnew"]?.value).subscribe(res => {
        this.totalRecords=res;
      }); 
      setTimeout(() => {
        this.apiValve.getByIdValvesMovement(this.valvesMovements, event.first, event.rows, event.filters["createAtnew"]?.value ).subscribe(res => {
          this.valveMovement = res;
         console.log("Total movimientos: ",this.valveMovement.length)
          this.loadingTable = false;
        });
      }, 1000);
    }
   
   
  }

  next() {
    this.first = this.first + this.rows;
  }
  prev() {
    this.first = this.first - this.rows;
  }
  reset() {
    this.first = 0;
  }
  isLastPage(): boolean {
    return this.valveMovement ? this.first === (this.valveMovement.length - this.rows) : true;
  }
  isFirstPage(): boolean {
    return this.valveMovement ? this.first === 0 : true;
  }
}
