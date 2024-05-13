import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  private url: string = "http://localhost:8080/client";
  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return new Observable<any>(observer => {
      this.http.get(this.url).pipe(
        catchError((err) => {
          observer.error(err);
          console.log(JSON.stringify(err))
          throw err;
        }),
        map(response => {
          return response;
        })
      ).subscribe(response => {
        observer.next(response);
        observer.complete();
      });
    })
  }

  findById(id: number): Observable<any> {
    return new Observable<any>(observer => {
      this.http.get(this.url + "/" + id).pipe(
        catchError((err) => {
          observer.error(err);
          console.log(JSON.stringify(err))
          throw err;
        }),
        map(response => {
          return response;
        })
      ).subscribe(response => {
        observer.next(response);
        observer.complete();
      });
    })
  }
}
