import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ProspectModel } from '../model/prospect.model';

@Injectable({
  providedIn: 'root',
})
export class ProspectService {

  private url: string = "http://localhost:8080/prospect";
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
    var data: ProspectModel = new ProspectModel();

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

  save(data: ProspectModel): ProspectModel {

    this.http.post(this.url, data).pipe(
      catchError((err) => {
        throw err;
      }),
      map(response => {
        return response;
      })).subscribe((response: any) => {
        data = response.data;
      })

    return data;
  }

  update(data: ProspectModel): ProspectModel {

    this.http.put(this.url + "/" + data.id, data).pipe(
      catchError((err) => {
        throw err;
      }),
      map(response => {
        return response;
      })).subscribe((response: any) => {
        data = response.data;
      })
    return data;
  }

  delete(id: number) {
    this.http.delete(this.url + "/" + id).pipe(
      catchError((err) => {
        throw err;
      })).subscribe((response: any) => {

      });
  }

  client(id: number) {
    this.http.put(this.url + "/to-client/" + id, {}).pipe(
      catchError((err) => {
        throw err;
      })).subscribe((response: any) => {

      });
  }

  findByNameOrDocument(value : string): Observable<any> {
    return new Observable<any>(observer => {
      this.http.get(this.url+"/findByNameOrDocument/"+value).pipe(
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
