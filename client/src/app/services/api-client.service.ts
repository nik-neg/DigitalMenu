import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  updateDish(restaurantId: string, menuId: string, dishId: string, body: any): void {
    const udpateURL = `${this.baseURL}/restaurants/${restaurantId}/menu/${menuId}/dish/${dishId}`
    const bodyForPatch = JSON.stringify(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'text/plain',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"

     })
    };
    // return this.http.post<any>(udpateURL, bodyForPatch) // , httpOptions
    //   .pipe(catchError(this.handleError<any>('updateDish')));

    // this.http.patch(udpateURL, bodyForPatch, httpOptions).toPromise().then((data:any) => {
    //   // console.log(data);
    //   // console.log(data.json.test);
    //   const temp = JSON.stringify(data.json);
    //   console.log(temp);
    // });
    this.http.patch(udpateURL, bodyForPatch)
    .subscribe(
        (val) => {
            console.log("PATCH call successful value returned in body",
                        val);
        },
        response => {
            console.log("PATCH call in error", response);
        },
        () => {
            console.log("The PATCH observable is now completed.");
        });
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
