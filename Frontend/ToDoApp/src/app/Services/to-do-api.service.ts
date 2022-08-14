import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToDo } from '../model/to-do';

@Injectable({
  providedIn: 'root',
})
export class ToDoAPIService {
  baseurl = 'https://localhost:7185/api/ToDo';

  constructor(private httpClient: HttpClient) {}

  // Include headers to avoid errors with API
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Add Task
  public addTask(todo: object): Observable<object> {
    let bodyString = JSON.stringify(todo);
    return this.httpClient.post(this.baseurl + '/Create', bodyString, {
      headers: this.httpOptions.headers,
    });
  }

  // Error Handling
  errorHandl(error: { error: { message: string }; status: any; message: any }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
