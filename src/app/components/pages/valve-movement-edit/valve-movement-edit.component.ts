/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, isDevMode, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ValveMovementModel } from '@app/models/valve-movement/valve-movement.module';
import { ValveMovementService } from '@app/services/valveMovement/valve-movement.service';
import { AuthService } from "@app/services/auth/auth.service";
import { UserModel } from "@app/models/user/userModel.module";
import { ValveService } from "@app/services/valve/valve.service";
import { valveModel } from "@app/models/valve/valve.module";
import { CatalogModule } from "@app/models/catalog/catalog.module";
import { CatalogService } from "@app/services/catalog/catalog.service";

import Swal from "sweetalert2";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-valve-movement-edit',
  templateUrl: './valve-movement-edit.component.html',
  styleUrls: ['./valve-movement-edit.component.scss']
})
export class ValveMovementEditComponent implements OnInit {

  blockSpecial: RegExp = /[0-9]/;  
  aFormGroup: FormGroup;
  valve: ValveMovementModel = new ValveMovementModel();
  users: UserModel[] = [];
  reason: CatalogModule[] = [];
  loading: boolean;
  close: number;
  open: number;
  prueba:any;
  public actions = [
    { id: 0, name: "Apertura" },
    { id: 1, name: "Cierre" },
  ];

  public valves : valveModel;
 public movementId:string;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiValveMovement: ValveMovementService,
    private apiValve: ValveService,
    private apiUser: AuthService,
    private apiCatalog: CatalogService,
    
  ) { }

  ngOnInit(): void {

    this.movementId = this.route.snapshot.params['id'];

    this.aFormGroup = this.formBuilder.group({
    id:[],
      valvesId: [0, [Validators.required]],
      reasonId: ["", [Validators.required]],
      otherReasons: ["", []],
      observation: ["", [Validators.required]],
      action: ["", [Validators.required]],
      turns: ["", [Validators.required]],
      full: ["", []]
    }, FormGroup);

    this.aFormGroup.valueChanges.subscribe(data => this.onValveMovementFormChange(data));
    this.apiCatalog.getAllReason().subscribe((res) => {
      this.reason = res.payload;
      this.loading = false;
    });
    
    this.apiValve.getByIdValvesMovementEdit(this.movementId)
    .subscribe(async data => {
      //aqui se tendria que traer desde el express el nombre del campo para poder hacer el patch value y se asigne directamente
      //o asignar campo por campo
      this.turns.setValue(data.turns);
      this.observation.setValue(data.observation);
      this.valvesId.setValue(data.valves_id);
      this.otherReasons.setValue(data.otherReasons);
      this.full.setValue(data.full);
      this.action.setValue(this.actions[data.action?1:0]);
      this.reasonId.setValue(data.reason); 
      this.prueba= data;
      console.log(" hola",this.prueba)
      
     }
      
    );
  }

  onValveMovementFormChange(data) {
    console.log(data);
    console.log(this.aFormGroup)

  }
  OpenCloseChange(event) {
       
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
   updateValveMovement() {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.aFormGroup.value;
        console.log("nara",formData)
        formData.action = this.action.value.id;
        formData.reasonId = this.reasonId.value.id;
        formData.valvesId =  this.valvesId.value;
        formData.full = Number(formData.full);
        delete formData["id"];
        this.apiValve.updateValvesMovement(this.movementId, formData)
          .pipe(first())
          .subscribe(() => {
            Swal.fire({
              showConfirmButton: false,
              position: "center",
            icon: "success",
            title: "Movimiento de válvula actualizado",
            });
            this.router.navigate([ "/valve/Detail", this.valvesId.value]);
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
        Swal.fire("Movimiento de válvula no actualizado", "", "info");
      }
    });

  }

  selectReason(reasons_id)
  {
    console.log("reason",reasons_id)
    const valueObj = this.reason.find(reasons => {
      return reasons.id === reasons_id;})
    console.log("reasons",valueObj);  
    this.aFormGroup.get("reasonId").setValue(valueObj);
  }

  get id() {
    return this.aFormGroup.get("id");
  }
  
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

  get turns() {
    return this.aFormGroup.get("turns");
  }

  get full() {
    return this.aFormGroup.get("full");
  }

 
}
