import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../interfaces/stundent';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

/*
  Generated class for the ProvidersStudentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvidersStudentProvider {

  constructor(public _http: HttpClient) {

  }
  addNewStudent(user: Student) {
    return this._http.post('https://cecytea-app.herokuapp.com/user', user).pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    let message;
    if(error.status===500){
      message='Un estudiante ya existe con ese correo.'
    }
    if (error.status === 0) {
      message = 'No se pudo conectar con el servidor, inténtelo más tarde.'
    }
    throw message;
  }

}
