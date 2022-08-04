import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Router } from "@angular/router";
/*---- MODELS---- */
import { UserModel } from "../../../models/user/userModel.module";
import { catchError, map, tap } from "rxjs/operators";
import { NgxRolesService } from "ngx-permissions";
import { Observable, throwError } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ManageUsersService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private rs: NgxRolesService
  ) {}
  /*  FUNCION POST CreateUser */
  CreateUser(user: UserModel) {
    return this.http.post(`${environment.apiUrl}user/signup`, user).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }
  GetDetailUser() {
    return this.http
      .get<{ payload: UserModel }>(`${environment.apiUrl}user/getDetail`)
      .pipe(
        map((res) => {
          return res.payload;
        })
      );
  }
  UpdatePassword(hashUser: string, params: any) {
    return this.http.put(`${environment.apiUrl}user/updatePassword/${hashUser}`, params);
  }
  /*  FUNCION GET GetAllUsers */
  GetAllUsers(): Observable<any> {
    return this.http
      .get<{ payload: UserModel }>(`${environment.apiUrl}user/getAll`)
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }
  /*FUNCION PUT UpdateUser */
  UpdateUser(hashUser: string, params: any) {
    return this.http.put(`${environment.apiUrl}user/update/${hashUser}`, params);
  }
  /*  FUNCION DELETE DeleteUser */
  DeleteUser(id: string) {
    return this.http.delete(`${environment.apiUrl}user/delete/${id}`);
  }
  /* FUNCION GetIdUser */
  GetIdUser(hash: string) {
    return this.http
      .get<{ payload: UserModel }>(`${environment.apiUrl}user/getById/${hash}`)
      .pipe(
        map((res) => {
          console.log("RES", res);
          return res.payload;
        })
      );
  }
}