import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { Observable, pipe, throwError } from 'rxjs';
import { CatalogModule } from '@app/models/catalog/catalog.module';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  getAllDiameter(): Observable<any> {
    return this.http.get<{ payload: CatalogModule }>(`${environment.apiUrl}catalog/diameter/getAll`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }))
  }

  getAllRoad(): Observable<any> {
    return this.http.get<{ payload: CatalogModule }>(`${environment.apiUrl}catalog/road/getAll`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }))
  }

  getAllValveLocation(): Observable<any> {
    return this.http.get<{ payload: CatalogModule }>(`${environment.apiUrl}catalog/location/getAll`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }))
  }

  getAllReason(): Observable<any> {
    return this.http.get<{ payload: CatalogModule }>(`${environment.apiUrl}catalog/reason/getAll`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }))
  }

  getAllTypes(): Observable<any> {
    return this.http.get<{ payload: CatalogModule }>(`${environment.apiUrl}catalog/types/getAll`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }))
  }
}
