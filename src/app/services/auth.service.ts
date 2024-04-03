import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient
  ) { }

  addUser(userObj: any): Observable<any>{
      return this._http.post('http://localhost:3000/users', userObj)
  }

  get getAllUser(): Observable<any[]>{
    return this._http.get<any[]>('http://localhost:3000/users')
  }

  // loginUser(userObj: any){
  //   return this.
  // }
}
