import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Restaurant } from './../restaurant/entities/restaurant';
import { Dish } from '../dish/entities/dish';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getRestaurants(url: string): Observable<Restaurant[]> {
    return this.fetchRestaurants(`${this.baseURL}/${url}`);
  }

  getRestaurant(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseURL}/restaurants/${id}`)
      .pipe(catchError(this.handleError<Restaurant>('getRestaurant')));
  }

  fetchRestaurants(url: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${url}`)
      .pipe(catchError(this.handleError<Restaurant[]>(
        'fetchRestaurants',
        [],
      )));
  }

  updateDish(restaurantId: string, menuId: string, dishId: string): Observable<Dish> {
    const udpateURL = `${this.baseURL}/restaurants/${restaurantId}/menu${menuId}/dish${dishId}`
    return this.http.get<Dish>(udpateURL)
      .pipe(catchError(this.handleError<Dish>('updateDish')));
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
      console.error(error); // Log to console instead

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
