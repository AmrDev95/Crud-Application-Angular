import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _HttpClient:HttpClient
  ) {
    if(localStorage.getItem('userToken') !=null){
      this.saveUserData();
    }
  }

  login(loginForm:FormGroup):Observable<any>{
    return this._HttpClient.post('https://route-egypt-api.herokuapp.com/signin', loginForm);
  }

  saveUserData(){
    let encodedToken:string = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken:Object = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
  }
}
