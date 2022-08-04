
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Component, OnInit, isDevMode, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { valveModel } from "@app/models/valve/valve.module";
import { ValveService } from "@app/services/valve/valve.service";
import { MunicipalitiesModule } from "@app/models/municipalities/municipalities.module";
import { MunicipalitiesService } from "@app/services/municipalities/municipalities.service";
import { SettlementModule } from "@app/models/settlement/settlement.module";
import { SettlementService } from "@app/services/settlement/settlement.service";
import { SectorModule } from "@app/models/sector/sector.module";
import { AuthService } from "@app/services/auth/auth.service";
import { UserModel } from "@app/models/user/userModel.module";
import { CatalogModule } from "@app/models/catalog/catalog.module";
import { CatalogService } from "@app/services/catalog/catalog.service";
import { NgxImageCompressService } from 'ngx-image-compress';
import Swal from "sweetalert2";

@Component({
  selector: "app-valve",
  templateUrl: "./valve.component.html",
  styleUrls: ["./valve.component.scss"],
})
export class ValveComponent implements OnInit {
  uploadedFiles: any[] = [];
  public selectedMunicipality: any;
  public selectedSettlement: any;
  public selectedSector: any;
  public sectors: SectorModule[] = [];
  public settlements: SettlementModule[] = [];
  public municipality: MunicipalitiesModule[] = [];
  users: UserModel[] = [];
  aFormGroup: FormGroup;
  loading: boolean;
  valve: valveModel = new valveModel();
  cargando = false;
  selectedFile: File;
  fileToUpload: File | null = null;
  public road: CatalogModule[] = [];
  public location: CatalogModule[] = [];
  public diameter: CatalogModule[] = [];
  latitude: number;
  longitude: number;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
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
    private formBuilder: FormBuilder,
    private apiUser: AuthService,
    private apiCatalog: CatalogService,
    private imageCompress: NgxImageCompressService
  ) {}

  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      id: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      municipalityId: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      settlementId: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      sectorId: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      zipcode: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      diameterId: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      valveType: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      valveLocationId: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      roadId: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      street: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      corner: [
        "",
        [
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      btwFirstStreet: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      btwSecondStreet: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      reference: [
        "",
        [
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      photo: [null, ""],
      diameter: [null,],
      directionClose: ["",[Validators.required]],
    });

    this.aFormGroup.valueChanges.subscribe((data) =>
      this.onValveFormChange(data)
    );

    this.loading = true;

    this.apiMunicipalities.getAllMunicipalities().subscribe((res) => {
      this.municipality = res.payload;
      this.loading = false;
    });

    this.apiCatalog.getAllDiameter().subscribe((res) => {
      this.diameter = res.payload;
      console.log("Diametros", this.diameter);
      this.loading = false;
    });

    this.apiCatalog.getAllRoad().subscribe((res) => {
      this.road = res.payload;
      console.log("Tipo de Red", this.road);
      this.loading = false;
    });

    this.apiCatalog.getAllValveLocation().subscribe((res) => {
      this.location = res.payload;
      console.log("Tipo e Asentamiento", this.location);
      this.loading = false;
    });

    this.getPosition().then(({ lat, lng }) => {
      this.latitude = lat;
      this.longitude = lng;
      console.log(this.latitude);
      console.log(this.longitude);
    });
  }


/*   compressFile() {
  
    this.imageCompress.uploadFile().then(({image, orientation}) => {
    
      this.imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      
      this.imageCompress.compressFile(image, orientation, 75, 50).then(
        result => {
          console.log(result);
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
        }
      );
      
    });
    
  } */
  onValveFormChange(date) {
    this.valve = date;
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

    
   /*  this.imageCompress.uploadFile().then(({image, orientation}) => {
    
      this.imgResultBeforeCompress = image;
      console.log("imagen",image);
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      
      this.imageCompress.compressFile(image, orientation, 75, 50).then(
        result => {
         
          this.imgResultAfterCompress = result;
          
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
        }
      );
      
    }); */
  }

  clearFile() {
    this.aFormGroup.get("photo").setValue(null);
    /* this.aFormGroup.nativeElement.value = ''; */
  }
  /*   onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
} */

  createValves() {
    console.log(this.uploadedFiles);
    console.log("formulario", this.aFormGroup.value);
    Swal.fire({
      title: "¿Desea registrar una nueva válvula?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.aFormGroup.value;
        formData.sectorId = this.sectorId.value.id;
        formData.settlementId = this.settlementId.value.id;
        formData.roadId = this.roadId.value.id;
        formData.valveLocationId = this.valveLocationId.value.id;
        formData.directionClose = this.directionClose.value.id;
        formData.photo = formData.photo ? formData.photo : null;
        formData.latitude = this.latitude;
        formData.longitude = this.longitude;
        formData.diameter= Number(formData.diameter)
        delete formData["id"];
        delete formData["municipalityId"];
        delete formData["zipcode"];
        delete formData["diameterId"];
        /* console.log(this.toFormData(this.aFormGroup.value)); */
        this.apiValve.createValves(formData).subscribe(
          (resp) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Válvula guardada correctamente",
              showConfirmButton: false,
            });
            this.router.navigate([
              "/valve/table",
            ]);
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
        Swal.fire("Válvula no guardada", "", "info");
      }
    });
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

  settlementChanged() {
    try {
      const settlement = this.aFormGroup.get("settlementId").value;
      this.aFormGroup.patchValue({
        zipcode: settlement.zip_code,
      });
      if (
        !this.selectedMunicipality ||
        (settlement.id != "" &&
          settlement.municipalityId != this.selectedMunicipality.id)
      ) {
        this.selectedSettlement = {
          id: settlement.municipalityId,
          municipality: settlement.settlement,
          municipalityId: settlement.municipalityId,
        };
      }
    } catch (e) {
      if (isDevMode()) console.trace(e);
      this.zipcode.patchValue("");
    }
  }

  get settlementId() {
    return this.aFormGroup.get("settlementId");
  }

  get diameterId() {
    return this.aFormGroup.get("diameterId");
  }

  get photo() {
    return this.aFormGroup.get("photo");
  }
  get valveType() {
    return this.aFormGroup.get("valvesTypeId");
  }

  get valveLocationId() {
    return this.aFormGroup.get("valveLocationId");
  }

  get roadId() {
    return this.aFormGroup.get("roadId");
  }
  get directionClose() {
    return this.aFormGroup.get("directionClose");
  }
  
  get street() {
    return this.aFormGroup.get("street");
  }

  get username() {
    return this.aFormGroup.get("username");
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

  set sectorId(value) {
    this.aFormGroup.get("sectorId").patchValue(value);
    this.selectedMunicipality = value;
  }

  set municipalityId(value) {
    this.aFormGroup.get("municipalityId").patchValue(value);
    this.selectedMunicipality = value;
  }

  set zipcode(value) {
    this.aFormGroup.get("zipcode").patchValue(value);
    this.selectedMunicipality = value;
  }

  set settlementId(value) {
    this.aFormGroup.get("settlementId").patchValue(value);
    this.selectedSettlement = value;
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
