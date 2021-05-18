import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import Restaurant from './restaurant/entities/restaurant';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private baseURL = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> {
    return this.fetchRestaurants('/restaurants');
  }

  fetchRestaurants(url: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseURL}${url}`)
      .pipe(catchError(this.handleError<Restaurant[]>('fetchRestaurants', []))
      );
    }

      /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
       private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead

          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${error.message}`);

          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
      /** Log */
      private log(message: string) {
        console.log(`Api Client Service: ${message}`);
      }
}