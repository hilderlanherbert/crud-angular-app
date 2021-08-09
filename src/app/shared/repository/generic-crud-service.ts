import { HttpClient } from '@angular/common/http';
import { delay, tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class GenericCrudService<T> {

  constructor(public http: HttpClient, private API_URL:string) {}

  public list(): Observable<T[]> {
    return this.http.get<T[]>(this.API_URL).pipe(take(1));
  }

   public create(record: T): Observable<Object> {
    return this.http.post(this.API_URL, record).pipe(take(1));
  }

   public update(record: T, id:number): Observable<Object> {    
    return this.http.patch(`${this.API_URL}/${id}`, record).pipe(take(1));
  }

  public remove(id:number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}