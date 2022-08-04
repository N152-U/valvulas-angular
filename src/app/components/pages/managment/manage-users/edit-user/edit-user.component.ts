/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";

/*----MODEL----- */
import { UserModel } from "../../../../../models/user/userModel.module";
import { roleModel } from "../../../../../models/role/roleModel.module";
/*----SERVICE---- */
import { ConfirmedValidator } from "@app/services/managment/manage-users/confirmed.validator";
import { ManageUsersService } from "../../../../../services/managment/manage-users/manage-users.service";
import { ManageRolesService } from "../../../../../services/managment/manage-roles/manage-roles.service";
@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit {
  EditUser: UserModel[] = [];
  // Dropdown
  public selectedRole: any;

  public roles: roleModel[] = [];

  editDetailGroup: FormGroup;
  id: string;
  fieldTextType: boolean;
  fieldTextTypeConfirmation: boolean;
  pattern: "/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$/";
  hashUser = require('object-hash');

  constructor(
    private api: ManageUsersService,
    private route: ActivatedRoute,
    private router: Router,
    private mrs: ManageRolesService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.hashUser = this.route.snapshot.params["hash"];
    
    this.editDetailGroup = this.formBuilder.group(
      {
        hashRole: ["", Validators.required], 
        username: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(100),
          ],
        ],
        firstName: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
            Validators.pattern(this.pattern),
          ],
        ],
        middleName: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
            Validators.pattern(this.pattern),
          ],
        ],
        lastName: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
            Validators.pattern(this.pattern),
          ],
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
        confirmPassword: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
      },
      {
        validator: ConfirmedValidator("password", "confirmPassword"),
      }
    );

    
    this.mrs.GetAllRoles().subscribe((res) => {
      this.roles = res.payload;
    });

    this.api.GetIdUser(this.hashUser).subscribe((x) => {
      this.EditUser[0] = x;
      this.editDetailGroup.patchValue(x);

      this.selectedRole = {
        id: 2,
        role: "CAPTURISTA1",
      };
      this.editDetailGroup.patchValue({
        roleId: {
          roleId: this.selectedRole.id,
          role: this.selectedRole.role,
        },
      });

      this.selectRole(this.hashRole.value);
    });

  }

 

  UpdateUser() {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.editDetailGroup.value;
        delete formData["confirmPassword"];
        formData.hashRole = formData.hashRole.hash;
        this.api.UpdateUser(this.hashUser, formData).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario actualizado",
            showConfirmButton: false,
          });
          this.router.navigate(["/managment/manage-users"]);
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
        Swal.fire("Usuario no actualizado", "", "info");
      }
    });
  }
  roleChanged() {null}

  

  get password() {
    return this.editDetailGroup.get("password");
  }

  get confirmPassword() {
    return this.editDetailGroup.get("confirmPassword");
  }
  
  get hashRole() {
    return this.editDetailGroup.get("hashRole");
  }  
  get username() {
    return this.editDetailGroup.get("username");
  }
  get firstName() {
    return this.editDetailGroup.get("firstName");
  }
  get middleName() {
    return this.editDetailGroup.get("middleName");
  }
  get lastName() {
    return this.editDetailGroup.get("lastName");
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextTypeConfirmation() {
    this.fieldTextTypeConfirmation = !this.fieldTextTypeConfirmation;
  }

  selectRole(hashRole: string) {
    const valueObj = this.roles.find(role =>{
     
      console.log("seleccionando rol",role);
      console.log("rol seleccionado",hashRole);
      return role['hash']==hashRole
    } )
    this.editDetailGroup.get("hashRole").setValue(valueObj);
  }

}
