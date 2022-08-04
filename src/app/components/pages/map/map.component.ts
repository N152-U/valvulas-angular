import { Component, isDevMode, OnInit } from '@angular/core';
import { MunicipalitiesModule } from "@app/models/municipalities/municipalities.module";
import { MunicipalitiesService } from "@app/services/municipalities/municipalities.service";
import { SectorModule } from "@app/models/sector/sector.module";
import { SettlementModule } from "@app/models/settlement/settlement.module";
import { SettlementService } from "@app/services/settlement/settlement.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {


   // Set our map properties
   mapCenter = [-99.1525698, 19.4211604];
   basemapType = 'topo-vector';
   mapZoomLevel = 12;
   loading: boolean;
   aFormGroup: FormGroup;
   public sectors: SectorModule[] = [];
   public settlements: SettlementModule[] = [];
   public municipality: MunicipalitiesModule[] = [];
   public selectedMunicipality: any;
   public selectedSettlement: any;
   public selectedSector: any;
   public selectedSublayer: any;
   
   public actions = [
    { id: 0, name: "Apertura" },
    { id: 1, name: "Cierre" },
  ];

  public sublayer = [
    { id: 0, name: "Sector" },
    { id: 1, name: "Colonia" },
  ];

 
   // See app.component.html
   mapLoadedEvent(status: boolean) {
     console.log('The map loaded: ' + status);
   }

   
  constructor(
    private apiMunicipalities: MunicipalitiesService,
    private apiSettlement: SettlementService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      startDate: [,
        [
          Validators.required,
          
        ],],
        endDate: [,
          [
            Validators.required,
            
          ],],
      municipalityId: [,
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),
      ],],
      sublayerId: [,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],],
        settlementId: [,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],],
        action: [,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(255),
          ],],
    });

    this.apiMunicipalities.getAllMunicipalities().subscribe((res) => {
      this.municipality = res.payload;
      this.loading = false;
    });
  }


  getData(){

  }

  
  municipalityChanged() {
    try {
      console.log("cambio en Alcaldía");
      const municipalityId =
        this.aFormGroup.get("municipalityId").value.real_id;

      //Colonias
      if (
        this.selectedMunicipality == null ||
        this.selectedMunicipality.realId != this.selectedSettlement.id
      ) {
        this.apiSettlement
          .getSettlementsByMunicipalityId(municipalityId)
          .subscribe(
            (response) => {
              if (response.payload != null) {
                this.settlements = response.payload;
                this.settlementId.enable();
                this.selectedSettlement = {};
              }
            },
            (err) => {
              this.settlements = [];
              this.settlementId.disable();
            }
          );
      }
      //Sectores
      if (
        this.selectedMunicipality == null ||
        this.selectedMunicipality.id != this.selectedSector.id
      ) {
        this.apiMunicipalities
          .getMunicipalitiesSectorById(municipalityId)
          .subscribe(
            (response) => {
              if (response.payload != null) {
                this.sectors = response.payload;
                this.sectorId.enable();
                this.selectedSector = {};
              }
            },
            (err) => {
              this.sectors = [];
              this.sectorId.disable();
            }
          );
      }
    } catch (e) {
      if (isDevMode()) console.trace(e);
      this.selectedSettlement = {};
      this.settlements = [];
      this.settlementId.disable();
    }
  }

  sublayerChanged()
  {
    console.log(this.sublayerId)
  }

  get settlementId() {
    return this.aFormGroup.get("settlementId").value;
  }
  get municipalityId() {
    return this.aFormGroup.get("municipalityId").value;
  }
  get sectorId() {

    return this.aFormGroup.get("sectorId").value;
  }

  get action() {
    return this.aFormGroup.get("action").value;
  }

  get sublayerId() {
    return this.aFormGroup.get("sublayerId").value;
  }

  set sectorId(value) {
    this.aFormGroup.get("sectorId").patchValue(value);
    this.selectedMunicipality = value;
  }

  set municipalityId(value) {
    this.aFormGroup.get("municipalityId").patchValue(value);
    this.selectedMunicipality = value;
  }

  set settlementId(value) {
    this.aFormGroup.get("settlementId").patchValue(value);
    this.selectedSettlement = value;
  }

 
}
