/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, isDevMode, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ValveMovementModel } from "@app/models/valve-movement/valve-movement.module";
import { ValveMovementService } from "@app/services/valveMovement/valve-movement.service";
import { AuthService } from "@app/services/auth/auth.service";
import { UserModel } from "@app/models/user/userModel.module";
import { ValveService } from "@app/services/valve/valve.service";
import { valveModel } from "@app/models/valve/valve.module";
import { CatalogModule } from "@app/models/catalog/catalog.module";
import { CatalogService } from "@app/services/catalog/catalog.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-valve-movement",
  templateUrl: "./valve-movement.component.html",
  styleUrls: ["./valve-movement.component.scss"],
})
export class ValveMovementComponent implements OnInit {
  blockSpecial: RegExp = /[0-9]/;
  aFormGroup: FormGroup;
  valve: ValveMovementModel = new ValveMovementModel();
  users: UserModel[] = [];
  reason: CatalogModule[] = [];
  loading: boolean;
  close: number;
  open: number;

  public directions = [
    { id: 0, name: "Izquierda" },
    { id: 1, name: "Derecha" },
  ];

  public actions = [
    { id: 0, name: "Apertura" },
    { id: 1, name: "Cierre" },
  ];
  public valves: any = [];
  protected valvesIds = this.route.snapshot.paramMap.get("id");

  constructor(
    private apiValve: ValveService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiValveMovement: ValveMovementService,
    private apiUser: AuthService,
    private apiCatalog: CatalogService
  ) {}

  ngOnInit(): void {

    this.valvesIds = this.route.snapshot.paramMap.get("id");
    this.apiValve.detailGetById(this.valvesIds).subscribe((res) => {
      this.valves = res;
    });

    this.aFormGroup = this.formBuilder.group({
      id: ["", [Validators.required]],
      valvesIds: ["", [Validators.required]],
      reasonId: ["", [Validators.required]],
      otherReasons: ["", []],
      observation: ["", [Validators.required]],
      action: ["", [Validators.required]],
      direction: ["", [Validators.required]],
      turns: ["", [Validators.required]],
      full: ["", []],
      /* fullClose: ["", []], */
    });

    this.aFormGroup.valueChanges.subscribe((data) =>
      this.onValveMovementFormChange(data)
    );

    this.apiCatalog.getAllReason().subscribe((res) => {
      this.reason = res.payload;
      this.loading = false;
    });

  }

  onValveMovementFormChange(date) {
    this.valve = date;
  }

  OpenCloseChange(event) {
    
    console.log("evento", event.value.id)
      // eslint-disable-next-line no-empty
      if (event.value.id == 0) {

        this.open = 0;
        this.close = 0;

        console.log("Apertura",  this.open);
     
      } else{
       
        this.close = 1;
        this.open = 1;
        console.log("Cierre",  this.close);
      }
  }

  reasonOnchenge(event){
       console.log("rason", event.value.id)
       // eslint-disable-next-line no-empty
       if (event.value.id == 4) {
        this.otherReasons.setValue(null);
        this.otherReasons.setValidators([Validators.required]);
        this.otherReasons.enable();
       } else{
         this.otherReasons.setValue(null);
         this.otherReasons.setValidators([]);
         this.otherReasons.disable();
         
       }
  }

  createValvesMovement() {
    Swal.fire({
      title: "¿Desea registrar el movimiento?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.aFormGroup.value;
        formData.action = this.action.value.id;
        formData.direction = this.direction.value.id;
        formData.reasonId = this.reasonId.value.id;
        if(formData.full == 0){
          formData.full = Number(2);
        }else{
          formData.full = Number( formData.full);
        }
        formData.valvesId = this.valves.id;
        delete formData["id"];
        delete formData["valvesIds"];
        this.apiValve.createValvesMovement(formData).subscribe(
          (resp) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Movimiento de válvula guardado ",
              showConfirmButton: false,
            });
            this.router.navigate(["/valve/Detail", this.valves.id]);
            setTimeout(() => {
              window.location.reload();
            }, 1300);
          },
          (resErr) => {
            console.log(resErr);
            let message;
            if (resErr.status === 400)
              message = resErr.error.validation['body'].message
            else if (resErr.status === 500)
              message = resErr.error.message;
            else
              message = "Error del servidor"
            Swal.fire({
              icon: "error",
              title: message,
              showConfirmButton: false,
            }).then(function () { });
          }
        );
      } else if (result.isDenied) {
        Swal.fire("Movimiento no guardado", "", "info");
      }
    });
  }

 /*  get fullClose() {
    return this.aFormGroup.get("fullClose");
  }
 */
  get valvesId() {
    return this.aFormGroup.get("valvesId");
  }

  get reasonId() {
    return this.aFormGroup.get("reasonId");
  }

  get otherReasons() {
    return this.aFormGroup.get("otherReasons");
  }

  get observation() {
    return this.aFormGroup.get("observation");
  }

  get action() {
    return this.aFormGroup.get("action");
  }

  get direction() {
    return this.aFormGroup.get("direction");
  }

  get turns() {
    return this.aFormGroup.get("turns");
  }

  get full() {
    return this.aFormGroup.get("full");
  }

  
}
