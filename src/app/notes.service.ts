import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from './authentication.service';



@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private _HttpClient:HttpClient,
    private _AuthenticationService:AuthenticationService
  ) { }

  addNote(note:FormGroup):Observable<any>{
    return this._HttpClient.post('https://route-egypt-api.herokuapp.com/addNote',note);
  }

  getUserNotes():Observable<any>{
    console.log('ahjhhhhh')
    console.log(this._AuthenticationService.userData.value._id);
    return this._HttpClient.get('https://route-egypt-api.herokuapp.com/getUserNotes', {headers:{token: `${localStorage.getItem('userToken')?.replace(/"/g, "")}` ,  userID: this._AuthenticationService.userData.value._id }} );
  }

  deleteNote(token:Object):Observable<any>{
    return this._HttpClient.delete('https://route-egypt-api.herokuapp.com/deleteNote', {body:token});
  }
}
