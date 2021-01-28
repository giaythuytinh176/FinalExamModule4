import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  getBook(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + `/books/${id}`);
  }

  createBook(book: object): Observable<object> {
    console.log(book);
    return this.http.post(environment.apiUrl + '/books', book);
  }

  updateBook(id: number, value: any): Observable<object> {
    return this.http.put(environment.apiUrl + `/books/${id}`, value);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + `/books/${id}`);
  }

  getBooksList(): Observable<any> {
    return this.http.get(environment.apiUrl + `/books`);
  }
}
