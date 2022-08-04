/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable linebreak-style */
import { Component, OnInit, isDevMode, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { valveModel } from '@app/models/valve/valve.module';
import { ValveService } from '@app/services/valve/valve.service';
import { MunicipalitiesModule } from "@app/models/municipalities/municipalities.module";
import { MunicipalitiesService } from "@app/services/municipalities/municipalities.service";
import { SettlementModule } from "@app/models/settlement/settlement.module";
import { SettlementService } from "@app/services/settlement/settlement.service";
import { SectorModule } from '@app/models/sector/sector.module';
import { AuthService } from '@app/services/auth/auth.service';
import { UserModel } from '@app/models/user/userModel.module';
import { DomSanitizer } from '@angular/platform-browser';
import { CatalogModule } from "@app/models/catalog/catalog.module";
import { CatalogService } from "@app/services/catalog/catalog.service";
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { NgxImageCompressService } from 'ngx-image-compress';


@Component({
  selector: 'app-valve-edit',
  templateUrl: './valve-edit.component.html',
  styleUrls: ['./valve-edit.component.scss']
})
export class ValveEditComponent implements OnInit {
  [x: string]: any;

  id!: string;
  loading: boolean;
  public imageurl;
  public selectedMunicipality: any;
  public imgResultAfterCompress;
  public selectedSettlement: any;
  public selectedSector: any;
  public sectors: SectorModule[] = [];
  public settlements: SettlementModule[] = [];
  public municipality: MunicipalitiesModule[] = [];
  users: UserModel[] = [];
  aFormGroup: FormGroup;
  valve: valveModel = new valveModel();
  cargando = false;
  selectedFile: File;
  public road: CatalogModule[] = [];
  public locations: CatalogModule[] = [];
  public diameter: CatalogModule[] = [];
  public directions = [
    { id: 0, name: "Izquierda" },
    { id: 1, name: "Derecha" },
  ];
  blockSpecial: RegExp = /[0-9]/;

  constructor(
    private apiValve: ValveService,
    private apiMunicipalities: MunicipalitiesService,
    private apiSettlement: SettlementService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiUser: AuthService,
    private apiCatalog: CatalogService,
    private sanitizer:DomSanitizer,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.aFormGroup = this.formBuilder.group({
      id: ["", [Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),]],
      municipalityId: ["", [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),]],
      settlementId: ["", [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),]],
      sectorId: ["", [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),]],
      zipcode: ["", [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),]],
      diameterId: ["", [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),]],
      valveType: ["", [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),]],
      valveLocationId: ["", [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),]],
      roadId: ["", [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),]],
      street: ["", [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),]],
      corner: ["", [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),]],
      btwFirstStreet: ["", [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),]],
      btwSecondStreet: ["", [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),]],
      reference: ["", [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),]],
      photo: ["",[]],
      diameter: [null,],
      directionClose: ["",[Validators.required]],
    }, FormGroup);
    
  

    this.aFormGroup.valueChanges.subscribe(data =>{ this.onValveFormChange(data)});
  

    this.loading = true;
    this.apiMunicipalities.getAllMunicipalities().subscribe((res) => {
      this.municipality = res.payload;
      this.loading = false;
    });

 
      
       this.apiCatalog.getAllDiameter().subscribe((res) => {
        this.diameter = res.payload;
        console.log("Diametros",this.diameter)
        this.loading = false;
      });
  
      this.apiCatalog.getAllRoad().subscribe((res) => {
        this.road = res.payload;
        console.log("Tipo de Red",this.road)
        this.loading = false;
      });   
  
      this.apiCatalog.getAllValveLocation().subscribe((res) => {
        this.locations = res.payload;
        console.log("Tipo e Asentamiento",this.locations)
        this.loading = false;
      });   

      this.apiValve.getByIdValves(this.id)
      .subscribe(async data => {
            console.log("data",data); this.aFormGroup.patchValue(data);
            this.loading = false;
            this.selectMunicipality(data.settlement.municipality_id);
            //this.selectDiameter(data.diameterId);
           // this.selectLocation(data.valveLocationId);
           this.aFormGroup.get("diameter").setValue(data.diameter.diameter);
           this.aFormGroup.get("valveLocationId").setValue(data.valves_location);
           this.aFormGroup.get("roadId").setValue(data.road);
           this.aFormGroup.get("valveType").setValue(data.valves_type["type"]);
           this.directionClose.setValue(this.directions[data.directionClose?1:0]);

          /*   this.selectRoad(data.roadId); */
            this.municipalityChanged();
            this.settlementChanged();
            console.log("colonias",this.settlements); 
            this.imgResultAfterCompress=this.sanitizer.bypassSecurityTrustResourceUrl(data.photos[0].data);
         });
  }  

  onValveFormChange(data) {

  }
  onFileChange(event) {
    
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      var file = event.target.files[0];     
      reader.readAsDataURL(file);
      reader.onload = async(e) => {/* await console.log(e.currentTarget?.result) */
      /*   this.aFormGroup.get("photo").patchValue({
          fileName: file.name,
          fileType: file.type,
         
        }); */
        await this.imageCompress.compressFile(e.target.result.toString(), 1, 75, 50).then(
          result => {
            console.log(result);
            this.imgResultAfterCompress = result;
            console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
            this.aFormGroup.get("photo").patchValue({
              fileName: file.name,
          fileType: file.type,
              data: this.imgResultAfterCompress,
            });
             console.log(this.photo)
          }
        );
     
       
       
      };
    }
  }

  clearFile() {
    this.aFormGroup.get("photo").setValue(null);
    /* this.aFormGroup.nativeElement.value = ''; */
  }


  updateValve() {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.aFormGroup.value;
        formData.sectorId = formData.sectorId.id?formData.sectorId.id:null;
        formData.settlementId = formData.settlementId.id;
        formData.roadId = formData.roadId.id;
        formData.valveLocationId = formData.valveLocationId.id;
        formData.diameterId = formData.diameterId.id;
        formData.directionClose = this.directionClose.value.id;
        formData.diameter= Number(formData.diameter)
        delete formData["id"];
        delete formData["municipalityId"];
        delete formData["zipcode"];
        delete formData["diameterId"];
        this.apiValve.updateValves(this.id, this.aFormGroup.value)
          .pipe(first())
          .subscribe(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Válvula actualizada",
              showConfirmButton: false,
            });
            this.router.navigate(["/valve/Detail", this.id]);
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
        Swal.fire("Válvula no actualizado", "", "info");
      }
    });
  }

  municipalityChanged() {
    try {
      const municipalityId = this.aFormGroup.get('municipalityId').value.real_id;
      //Colonias
      if (this.selectedMunicipality == null || this.selectedMunicipality.realId != this.selectedSettlement.id) {
        this.apiSettlement.getSettlementsByMunicipalityId(municipalityId).subscribe((response) => {
        
          if (response.payload != null) {
            this.settlements = response.payload;
            this.settlementId.enable();
            this.selectedSettlement = {};
          }
          this.selectSettlement(this.settlementId.value);
          this.settlementChanged();
        }, (err) => {
          this.settlements = [];
          this.settlementId.disable();
        })
      }
      //Sectores
      if (this.selectedMunicipality == null || this.selectedMunicipality.realId != this. selectedSector.id) {
        this.apiMunicipalities.getMunicipalitiesSectorById(municipalityId).subscribe((response) => {
          if (response.payload != null) {
            this.sectors = response.payload;
            this.sectorId.enable();
            this.selectedSector = {};
          }
          this.selectSector(this.sectorId.value);
        }, (err) => {
          this.sectors = [];
          this.sectorId.disable();
        })
      }
    } catch (e) {
      if (isDevMode()) console.trace(e)
      this.selectedSettlement={};
      this.settlements = [];
      this.settlementId.disable();
    }
  }

  settlementChanged() {
    try {
      const settlement = this.aFormGroup.get('settlementId').value;
      this.aFormGroup.patchValue({
        zipcode: settlement.zip_code,
       /*  municipalityId: { id: settlement.municipalityId, municipality: settlement.settlement } */
      });
      if (!this.selectedMunicipality || (settlement.id != "" && (settlement.municipalityId != this.selectedMunicipality.id))) {
        this.selectedSettlement={ id: settlement.municipalityId, municipality: settlement.settlement, municipalityId: settlement.municipalityId };
      }
    } catch (e) {
      if (isDevMode()) console.trace(e)
      this.zipcode.patchValue("");
    }
  }

  selectMunicipality(municipalityId)
  {
    const valueObj = this.municipality.find(municipality => municipality.real_id === municipalityId)
    this.aFormGroup.get("municipalityId").setValue(valueObj);
  }

  selectSettlement(settlementId)
  {
    const valueObj = this.settlements.find(settlement => {
    return settlement.id === settlementId;})
    this.aFormGroup.get("settlementId").setValue(valueObj);
  }

  selectSector(sectorId)
  {
    console.log("sectorId",sectorId)
    const valueObj = this.sectors.find(sector => {
      
      console.log("sector",sector);

      return sector.id === sectorId;})
    console.log("sector",valueObj);  
    this.aFormGroup.get("sectorId").setValue(valueObj);
  }

  selectDiameter(diameterId)
  {
    console.log("diameterId",diameterId)
    const valueObj = this.diameter.find(diameters => {
    return diameters.id === diameterId;})
    console.log("diametros",valueObj);  
    this.aFormGroup.get("diameterId").setValue(valueObj);
  }

  selectLocation(valveLocationId){

    console.log("locationId",valveLocationId)
    const valueObj = this.locations.find(location => {
      console.log("localizacionId",location);  
    return location.id === valveLocationId;})
    this.aFormGroup.get("valveLocationId").setValue(valueObj);
  }

 selectRoad (roadId){
    console.log("red",roadId)
    const valueObj = this.road.find(roads => {
      
      console.log("sector",roads);

      return roads.id === roadId;})
    console.log("sector",valueObj);  
    this.aFormGroup.get("sectorId").setValue(valueObj);

  } 

  get settlementId() {
    return this.aFormGroup.get("settlementId");
  }

  get diameterId() {
    return this.aFormGroup.get("diameterId");
  }

  get valveType() {
    return this.aFormGroup.get("valvesTypeId");
  }

  get valveLocationId() {
    return this.aFormGroup.get("valvesLocationId");
  }

  get roadId() {
    return this.aFormGroup.get("roadId");
  }
  
  get street() {
    return this.aFormGroup.get("street");
  }

  get createdBy() {
    return this.aFormGroup.get("createdBy");
  }

  get corner() {
    return this.aFormGroup.get("corner");
  }
  
  get btwFirstStreet() {
    return this.aFormGroup.get("btwFirstStreet");
  }

  get btwSecondStreet() {
    return this.aFormGroup.get("btwSecondStreet");
  }

  get reference() {
    return this.aFormGroup.get("reference");
  }

  get municipalityId() {
    return this.aFormGroup.get("municipalityId");
  }

  get zipcode() {
    return this.aFormGroup.get("zipcode");
  }

  get sectorId() {
    return this.aFormGroup.get("sectorId");
  }
  get directionClose() {
    return this.aFormGroup.get("directionClose");
  }

  get photo() {
    return this.aFormGroup.get("photo");
  }

  set sectorId(value) {
    this.aFormGroup.get('sectorId').patchValue(value);
    this.selectedMunicipality = value;
  }

  set municipalityId(value) {
    this.aFormGroup.get('municipalityId').patchValue(value);
    this.selectedMunicipality = value;
  }

  set zipcode(value) {
    this.aFormGroup.get('zipcode').patchValue(value);
    this.selectedMunicipality = value;
  }

  set settlementId(value) {
    this.aFormGroup.get('settlementId').patchValue(value);
    this.selectedSettlement = value;
  }

  set diameterId(value) {
    this.aFormGroup.get('diameterId').patchValue(value);
    this.selectedSettlement = value;
  }

  set valveLocationId(value) {
    this.aFormGroup.get('valveLocationId').patchValue(value);
    this.selectedSettlement = value;
  }

  set roadId(value) {
    this.aFormGroup.get('roadId').patchValue(value);
    this.selectedSettlement = value;
  }

}
