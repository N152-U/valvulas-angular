/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { Observable, pipe, throwError } from 'rxjs';
import { ValveMovementModel } from '@app/models/valve-movement/valve-movement.module';

@Injectable({
  providedIn: 'root'
})
export class ValveMovementService {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  createValvesMovement(valves: ValveMovementModel) {
    return this.http.post(`${environment.apiUrl}valve/createMovement`, valves)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      )
  }

  getByIdValvesMovement(id: String) {
    return this.http.get<{ payload: ValveMovementModel }>(`${environment.apiUrl}valve/movements/${id}`)
      .pipe(map(res => {
        return res.payload;
      }));
  }

  getByIdValvesMovementEdit(id: String) {
    return this.http.get<{ payload: ValveMovementModel }>(`${environment.apiUrl}movement/getById/${id}`)
      .pipe(map(res => {
        return res.payload;
      }));
  }

  deletevalvesMovement(id: String) {
    return this.http.delete(`${environment.apiUrl}valveMovement/delete/${id}`);
  }
  
  updateValvesMovement(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}valveMovement/update/${id}`, params);
  }
  /* getAllValveMovement(): Observable<any> {
    return this.http.get<{ payload: ValveMovementModel }>(`${environment.apiUrl}valve/getAll`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }))
  }

  

  updateValvesMovement(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}valve/update/${id}`, params);
  }

  deletevalvesMovement(id: String) {
    return this.http.delete(`${environment.apiUrl}valve/delete/${id}`);
  } */
}
