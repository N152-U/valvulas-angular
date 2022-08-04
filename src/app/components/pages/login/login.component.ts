import {
  Component,
  OnInit,
  isDevMode,
} from "@angular/core";
import {
  Validators,
  FormBuilder,
} from "@angular/forms";
import { UserModel } from "../../../models/user/user.module";
import { Router } from "@angular/router";

import { AuthService } from "../../../services/auth/auth.service";

import Swal from "sweetalert2";
import { environment } from "@environments/environment.prod";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  [x: string]: any;

  siteKey: string;
  [i: number]:0;
  contador = 1;

  constructor(
    private router: Router,
    public user: UserModel,
    public auth: AuthService,
    public formBuilder: FormBuilder
  ) {
    this.appVersion = environment.version;
    this.appAlias = environment.alias;
    this.siteKey = "6LelZ4EdAAAAAL1GgZr-l5DYfQuCfNKqcNjs2t0S";
  }

  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(2)]],
      password: ["", Validators.required],
      recaptcha: ["", Validators.required ? this.contador > 3 : Validators.nullValidator]
    });

    
    if (this.auth.isAuth()) {
      this.router.navigateByUrl("/home");
    }
    
  }

  onSubmit() {
    //pristine es una propiedad del formulario que indica si el formulario se conserva
    //tal cual se dio al usuario(true), si el usuario lo modifica (false)

    if(this.contador > 3){ 
      if (this.aFormGroup.value.recaptcha != "") {
     
      this.aFormGroup.value.recaptcha = "";
      this.aFormGroup.value = {
        username: this.aFormGroup.value.username,
        password: this.aFormGroup.value.password,
      };

      this.auth.logIn(this.aFormGroup.value).subscribe(
        (data) => {
          this.router.navigateByUrl("/home");
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
    }}else{
     
        this.aFormGroup.value = {
          username: this.aFormGroup.value.username,
          password: this.aFormGroup.value.password,
        };
  
        this.auth.logIn(this.aFormGroup.value).subscribe(
          (data) => {
            this.router.navigateByUrl("/home");
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
    }
   
  }
  get username() {
    return this.aFormGroup.get('username');
  }
  get password() {
    return this.aFormGroup.get('password');
  }
  get recaptcha() {
    return this.aFormGroup.get('recaptcha');
  }
}
