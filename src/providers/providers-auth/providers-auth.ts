import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentLogin } from '../../interfaces/studentLogin';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

/*
  Generated class for the ProvidersAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvidersAuthProvider {

  constructor(public _http: HttpClient) {

  }
  checkUser(user: StudentLogin){
    return this._http.post('https://cecytea-app.herokuapp.com/loginUser',user).pipe(catchError(this.errorHandler));
  }
  public errorHandler(err: HttpErrorResponse):Observable<any>{
    let message;
    if(err.status===400){
      message='Correo o contraseña incorrectos.'
    }
    if(err.status===0){
      message = 'No se ha podido conectar con el servidor, inténtelo más tarde.';
    }
    throw message;
  }


}
