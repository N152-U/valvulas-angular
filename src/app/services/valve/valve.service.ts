import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { Observable, pipe, throwError } from 'rxjs';
import { valveModel } from '@app/models/valve/valve.module';
import { ValveMovementModel } from '@app/models/valve-movement/valve-movement.module';
import { ValveDetailModel } from '@app/models/valve-detail/valve-detail.module';

@Injectable({
  providedIn: 'root'
})
export class ValveService {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  getTotalRegisters(offset, limit, municipality=null, settlement=null, createdAt=null, street= null, sector=null)
  {
     // Initialize Params Object
     let params = new HttpParams();

     // Begin assigning parameters
     params = params.append('offset', offset);
     params = params.append('limit', limit);
     console.log("municipality",municipality)
     if(municipality)
     params = params.append('municipality', municipality);
     if(settlement)
     params = params.append('settlement', settlement);
     if(createdAt)
     params = params.append('createdAt', createdAt);
     if(street)
     params = params.append('street', street);
     if(sector)
     params = params.append('sector', sector);
    return this.http.get<{ payload: number }>(`${environment.apiUrl}valve/getTotalCount`,{params})
    .pipe(tap(data => {
      return  data.payload;
    }),
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      }))
  }

  getTotalMovement(offset, limit, valveId=null, status= null, sector=null, reason=null, action=null)
  {
    let params = new HttpParams();
    params = params.append('offset', offset);
    params = params.append('limit', limit);
    if(valveId)
    params = params.append('valveId', valveId);
    if(status)
    params = params.append('status', status.id);
    if(sector)
    params = params.append('sector', sector.id);
    if(reason)
    params = params.append('reason', reason.id);
    if(action)
    params = params.append('action', action.id);


    return this.http.get<{ payload: number }>(`${environment.apiUrl}valve/movement/getTotalCountDaily`,{params})
    .pipe(tap(data => {
      return  data.payload;
    }),
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
    }))
  }
  createValves(valves: any) {
    return this.http.post(`${environment.apiUrl}valve/create`, valves)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      )
  }

  getTotalRegistersMovement(id: String, offset, limit, createdAt=null) {
    
    let params = new HttpParams();

    params = params.append('offset', offset);
    params = params.append('limit', limit);
    if(createdAt)
     params = params.append('createdAt', createdAt);
    return this.http.get<{ payload: number }>(`${environment.apiUrl}valve/${id}/movement/getTotalCount`, {params})
    .pipe(map(res => {
      return res.payload;
    }));
  }


  getAllValves(offset, limit, municipality=null, settlement=null, createdAt=null, street= null, sector=null): Observable<any> {
     // Initialize Params Object
     let params = new HttpParams();

     // Begin assigning parameters
     params = params.append('offset', offset);
     params = params.append('limit', limit);
     console.log("municipality",municipality)
     if(municipality)
     params = params.append('municipality', municipality);
     if(settlement)
     params = params.append('settlement', settlement);
     if(createdAt)
     params = params.append('createdAt', createdAt);
     if(street)
     params = params.append('street', street);
     if(sector)
     params = params.append('sector', sector);

    return this.http.get<{ payload: valveModel }>(`${environment.apiUrl}valve/getAll`,{params})
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }))
  }

  getByIdValves(id: String) {
    return this.http.get<{ payload: valveModel }>(`${environment.apiUrl}valve/getById/${id}`)
      .pipe(map(res => {
        return res.payload;
      }));
  }

  detailGetById(id: String)  {
    return this.http.get<{ payload: ValveDetailModel }>(`${environment.apiUrl}valve/detailGetById/${id}`)
      .pipe(map(res => {
        return res.payload;
      }));
  }

  updateValves(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}valve/update/${id}`, params);
  }

  deletevalves(id: String) {
    return this.http.delete(`${environment.apiUrl}valve/delete/${id}`);
  }

  createValvesMovement(valves: ValveMovementModel) {
    return this.http.post(`${environment.apiUrl}valve/movement/create`, valves)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      )
  }

  getByIdValvesMovement(id: String, offset, limit, createdAt=null ) {
    let params = new HttpParams();
    params = params.append('offset', offset);
    params = params.append('limit', limit);
    if(createdAt)
    params = params.append('createdAt', createdAt);
    return this.http.get<{ payload: ValveMovementModel }>(`${environment.apiUrl}valve/${id}/movement/getAll`, {params})
      .pipe(map(res => {
        return res.payload;
      }));
  }

  getByIdValvesMovementEdit(id: String) {
    return this.http.get<{ payload: ValveMovementModel }>(`${environment.apiUrl}valve/movement/getById/${id}`)
      .pipe(map(res => {
        return res.payload;
      }));
  }

  deletevalvesMovement(id: String) {
    return this.http.delete(`${environment.apiUrl}valve/movement/delete/${id}`);
  }
  
  updateValvesMovement(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}valve/movement/update/${id}`, params);
  }

  getByToday(offset, limit, valveId=null, status= null, sector=null, reason=null, action=null) {

    let params = new HttpParams();
    params = params.append('offset', offset);
    params = params.append('limit', limit);
    if(valveId)
    params = params.append('valveId', valveId);
    if(status)
    params = params.append('status', status.id);
    if(sector)
    params = params.append('sector', sector);
    if(reason)
    params = params.append('reason', reason.id);
    if(action)
    params = params.append('action', action.id);

    return this.http.get<{ payload: ValveMovementModel }>(`${environment.apiUrl}valve/movement/getByToday`, {params})
    .pipe(map(res => {
      return res.payload;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }))
  }

  /* getByToday(offset, limit, ) {
    let params = new HttpParams();
    params = params.append('offset', offset);
    params = params.append('limit', limit);
   
    
    return this.http.get<{ payload: ValveMovementModel }>(`${environment.apiUrl}valve/movement/getByToday`, {params})
    .pipe(map(res => {
      return res.payload;
    }));
  } */
}
