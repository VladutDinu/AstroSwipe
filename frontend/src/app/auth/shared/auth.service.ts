import { Injectable } from '@angular/core';
import { FirstRegisterPayload } from '../shared/first-register.payload'
import { SecondRegisterPayload } from '../shared/second-register.payload'
import { Observable, ObservedValuesFromArray } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginPayload } from './login.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(firstRegisterPayload: FirstRegisterPayload ): Observable<any> {
    return this.http.post('http://localhost:8000/register_step1', firstRegisterPayload);
  }

  register(secondRegisterPayload: SecondRegisterPayload ): Observable<any> {
    return this.http.post('http://localhost:8000/register_step2', secondRegisterPayload);
  }

  login(loginPayload: LoginPayload): Observable<any> {
    return this.http.post('http://localhost:8000/login', loginPayload);
  }

  codeVerif(token: string): Promise<any>{
    return fetch('http://localhost:8000/code_verif?token='+token).then(response => response.json());
  }
}