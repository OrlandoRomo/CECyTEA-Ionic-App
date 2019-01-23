import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../interfaces/stundent';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProvidersStorageProvider } from '../providers-storage/providers-storage';
import { Tests } from '../../interfaces/test';

@Injectable()
export class ProvidersStudentProvider {

  public idStudent: string;
  public token: string;
  constructor(
    public _http: HttpClient,
    private _storage: ProvidersStorageProvider) {

  }
  addNewStudent(user: Student) {
    return this._http.post('https://cecytea-app.herokuapp.com/user', user).pipe(catchError(this.errorHandler));
  }
  getStudentInformation(): Promise<any> {
    return this._storage.getStudentInfo().then((student) => {
      return student;
    });
  }
  async getCountDocumentsTests() {
    this.idStudent = await this._storage.getStudentId();
    this.token = await this._storage.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.token
      })
    };
    return this._http.get(`https://cecytea-app.herokuapp.com/tests/done/${this.idStudent}`, httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  async getTestsDone() {
    this.idStudent = await this._storage.getStudentId();
    this.token = await this._storage.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.token
      })
    };
    return this._http.get(`https://cecytea-app.herokuapp.com/test/${this.idStudent}`, httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  async deleteTest(id: string) {
    this.token = await this._storage.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.token
      })
    };
    return this._http.delete(`https://cecytea-app.herokuapp.com/test/${id}`, httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  async getNewRandomTest() {
    this.token = await this._storage.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.token
      })
    };
    return this._http.get(`https://cecytea-app.herokuapp.com/question`, httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  async deleteAllTest() {
    this.token = await this._storage.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.token
      })
    };
    return this._http.delete(`https://cecytea-app.herokuapp.com/test`, httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  async saveNewTest(test: Tests) {
    this.idStudent = await this._storage.getStudentId();
    this.token = await this._storage.getToken();
    test.user = this.idStudent;
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.token
      })
    };
    return this._http.post(`https://cecytea-app.herokuapp.com/test`, test, httpOptions)
      .pipe(catchError(this.errorHandler));

  }
  public getGradeForTheTest(answers: string[], listOfQuestion: string[], time: string) {
    let testObject: Tests = {correctAnswers:0,incorrectAnswers:0,timer:'',user:''};
    let correctAnswers = 0;
    listOfQuestion.forEach((question: any, index) => {
      if (question.correctOption === answers[index]) {
        correctAnswers++;
      }
    });
    let incorrectAnswers = listOfQuestion.length - correctAnswers;
    console.log(correctAnswers,incorrectAnswers);

    testObject.correctAnswers = correctAnswers;
    testObject.incorrectAnswers = incorrectAnswers;
    testObject.timer = time;
    return testObject;
    
    

  }
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    let message;
    if (error.status === 500) {
      message = 'Un estudiante ya existe con ese correo.'
    }
    if (error.status === 400) {
      message = 'No ha hecho ningún test.'
    }
    if (error.status === 0) {
      message = 'No se pudo conectar con el servidor, inténtelo más tarde.'
    }
    throw message;
  }

}
