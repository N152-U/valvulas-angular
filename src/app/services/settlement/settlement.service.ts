import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SettlementModule } from '@app/models/settlement/settlement.module';


@Injectable({
  providedIn: 'root'
})
export class SettlementService {

  constructor(private http: HttpClient) { }

  getSettlementsByMunicipalityId( municipalityId): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}catalog/settlement/getByMunicipality/${municipalityId}`)
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

  getAllSettlemet():Observable<any> {
    return this.http.get<{payload: SettlementModule}>(`${environment.apiUrl}catalog/settlement/getAll`)
    .pipe(tap(data=>{
    
      return data;
     }),
     catchError((err: HttpErrorResponse) => {
       return throwError(err);
     }))
  }

  
}
