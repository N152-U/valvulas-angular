/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

/*----SERVICES----- */
import { ManageUsersService } from "../../../../services/managment/manage-users/manage-users.service";
/*----MODELS---- */
import { UserModel } from "../../../../models/user/UserModel.module";

@Component({
  selector: "app-manage-users",
  templateUrl: "./manage-users.component.html",
  styleUrls: ["./manage-users.component.scss"],
})
export class ManageUsersComponent implements OnInit {
  users: UserModel[] = [];
  cargando = false;
  first = 0;
  rows = 10;

  constructor(private api: ManageUsersService, public router: Router) {}

  ngOnInit(): void {
    this.cargando = true;

    this.api.GetAllUsers().subscribe(res => {
      this.users = res.payload;
      this.cargando = false;
    });
  }

  DeleteUser(user: UserModel, i: number) {
    Swal.fire({
      title: `¿Está seguro que desea borrar a ${user.username}?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.users.splice(i, 1);
        this.api.DeleteUser(user.hash).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario eliminado",
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1300);
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
    return this.users ? this.first === (this.users.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
  }
}
