import { first } from 'rxjs/operators';
import {
  Component,
  isDevMode,
  OnDestroy,
  OnInit,
  Renderer2,
} from "@angular/core";
import { Router } from "@angular/router";
/* import { single } from '../../../assets/json/data'; */

import { ViewChild } from "@angular/core";
import { SortEvent } from "primeng/api";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ValveService } from "@app/services/valve/valve.service";
import { valveModel } from "@app/models/valve/valve.module";
import { ValveMovementModel } from "@app/models/valve-movement/valve-movement.module";
import { LazyLoadEvent } from 'primeng/api';
import { CatalogModule } from "@app/models/catalog/catalog.module";
import { CatalogService } from "@app/services/catalog/catalog.service";

import {
  BsDatepickerConfig,
  BsDatepickerViewMode,
} from "ngx-bootstrap/datepicker";

import * as xml2js from "xml2js";

import Swal from "sweetalert2";

import * as moment from "moment";
import { NgxPermissionsService, NgxRolesService } from "ngx-permissions";
import { HttpClient } from "@angular/common/http";
declare var $: any;
const exp = /^EXT-/g;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  /* rm -rf node_modules/
  npm cache clear
  npm install

  npm install jquery --save

npm install datatables.net --save

npm install datatables.net-dt --save

npm install angular-datatables --save

npm install @types/jquery --save-dev

npm install @types/datatables.net --save-dev

npm install bootstrap --save

https://github.com/xbox2204/SpringBoot-JPA-Swagger-Angular/blob/master/app/Angular/src/app/book-list/book-list.component.ts
 */
  /* Para datepicker

https://valor-software.com/ngx-bootstrap/#/datepicker#min-mode
 */

  datePickerValue: Date = new Date();
  dateRangePickerValue: Date[];
  minMode: BsDatepickerViewMode = "year";
  minDate: Date = new Date(2009, 0);
  maxDate: Date = new Date();
  datePickerInvalidState: boolean;
  datePickerInvalidText: string;
  loadingButton: boolean;
  valveMovementTodayDate: any;
  cargando = false;
  bsConfig: Partial<BsDatepickerConfig>;
  progressPercent: number;
  loadingTable=true;
  totalRecords:Number=0;
  newMovement: ValveMovementModel[] = [];
  cols: any[];
  first = 0;
  rows = 20;
  name: string;
  id:number;
  public movementStatus = [
    { id: 1, name: "Abierto Completamente" },
    { id: 2, name: "Flujo Regulado" },
    { id: 3, name: "Cerrado Completamente" },
  ];

  public actions = [
    { id: 0, name: "Apertura" },
    { id: 1, name: "Cierre" },
  ];
  reason: CatalogModule[] = [];
  loading: boolean;
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private ps: NgxPermissionsService,
    private rs: NgxRolesService,
    private http: HttpClient,
    private apiValve: ValveService,
    private apiCatalog: CatalogService
  ) {}
  permissions$ = this.ps.permissions$;
  roles$ = this.rs.roles$;

  ngOnInit(): void {
    this.cargar();
    null;

    this.apiCatalog.getAllReason().subscribe((res) => {
      this.reason = res.payload;
      console.log(this.reason);
      this.loading = false;
    });

  }

  cargar() {
    this.getByToday(null);
    this.cargando = true;
  }

  getByToday(event: LazyLoadEvent){
    console.log(event);
    if(event)
    {
      setTimeout(() => {
        this.loadingTable = true;
        this.apiValve.getTotalMovement(event.first, event.rows, event.filters["valves_id"]?.value, event.filters["movementStatus.id"]?.value, event.filters["valf.sector.cve_sec"]?.value, event.filters["reason.id"]?.value, event.filters["actions.id"]?.value).subscribe(res => {
          this.totalRecords=res.payload;
        });
        this.apiValve.getByToday(event.first, event.rows, event.filters["valves_id"]?.value, event.filters["movementStatus.id"]?.value, event.filters["valf.sector.cve_sec"]?.value, event.filters["reason.id"]?.value, event.filters["actions.id"]?.value).subscribe(res => {
          this.valveMovementTodayDate = res;
          this.loadingTable = false;
        });
      }, 1000);
    }
  }

  ngAfterViewInit(): void {
    this.renderer.listen("document", "click", (event) => {
      if (event.target.hasAttribute("view-link-id")) {
        if (isDevMode()) console.log(event);
      }
    });
  }

  ngOnDestroy() {

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
    return this.newMovement ? this.first === (this.newMovement.length - this.rows) : true;
  }
  isFirstPage(): boolean {
    return this.newMovement ? this.first === 0 : true;
  }
  
}
