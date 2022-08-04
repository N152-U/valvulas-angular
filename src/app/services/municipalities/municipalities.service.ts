import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { MunicipalitiesModule } from '@app/models/municipalities/municipalities.module';

@Injectable({
  providedIn: 'root'
})
export class MunicipalitiesService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  getAllMunicipalities():Observable<any> {
    return this.http.get<{payload: MunicipalitiesModule}>(`${environment.apiUrl}catalog/municipality/getAll`)
    .pipe(tap(data=>{
      return data;
     }),
     catchError((err: HttpErrorResponse) => { 
       return throwError(err);
     }))
  }

  getMunicipalitiesSectorById( municipalityId): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}catalog/sector/getByMunicipality/${municipalityId}`)
      .pipe(tap(data => {
        return data;
      },
        (data) => {
          return data.payload;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }))
  }

}
