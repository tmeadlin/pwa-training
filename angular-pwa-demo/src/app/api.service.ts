import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(this.appendDomain(path), { params: params })
      .pipe(
        catchError(this.logError)
      );
  }

  post<T>(path: string, body: Object = {}): Observable<T> {
    return this.http.post<T>(this.appendDomain(path), body)
      .pipe(
        catchError(this.logError)
      );
  }

  private appendDomain(path: string) {
    return `${environment.apiDomain}${path}`;
  }

  private logError(error: any) {
    if (!environment.production) {
      console.log('Error Occurred: ', error);
    }

    return throwError('An Error Has Occurred!');
  }
}
