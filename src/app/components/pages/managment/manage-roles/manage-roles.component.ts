import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

import { ManageRolesService } from "../../../../services/managment/manage-roles/manage-roles.service";
import { roleModel } from "../../../../models/role/roleModel.module";

import { NgxPermissionsService, NgxRolesService } from "ngx-permissions";

declare var $: any;
declare var require: any;
@Component({
  selector: "app-manage-roles",
  templateUrl: "./manage-roles.component.html",
  styleUrls: ["./manage-roles.component.scss"],
})
export class ManageRolesComponent implements OnInit {
  roles: roleModel[] = [];
  cargando = false;
  first = 0;
  rows = 10;
 hash = require('object-hash');
 
  enctexto: string;

  destexto: string;

  encPass: string;

  desPass: string;

  textoEncriptado: any;

  textoDesencriptado: string;


  constructor(private api: ManageRolesService, public router: Router,private ps: NgxPermissionsService,) {}

  permissions$ = this.ps.permissions$;
 

  ngOnInit(): void {
    this.cargando = true;

    this.api.GetAllRoles().subscribe(res => {
      
      this.roles = res.payload;
      this.cargando = false;

    });    
  }



  deleteRole(role: roleModel, i: number) {
    Swal.fire({
      title: `¿Está seguro que desea borrar el rol ${role.role}?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.roles.splice(i, 1);
        this.api.DeleteRole(role.hash).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Rol eliminado",
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        });
      }if (result.isDenied) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Rol no eliminado",
          showConfirmButton: true,
        });

        
      }
    });
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
    return this.roles ? this.first === (this.roles.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.roles ? this.first === 0 : true;
  }
}
