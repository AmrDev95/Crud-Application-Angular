import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
    private _AuthenticationService:AuthenticationService,
    private _Router:Router
  ) { }

  ngOnInit(): void {
  }

  login(loginForm:FormGroup){
    this._AuthenticationService.login(loginForm.value).subscribe(
      (data)=>{
        localStorage.setItem('userToken', JSON.stringify(data.token));
        this._AuthenticationService.saveUserData();
        this._Router.navigate(['/home']);
      }
    );
  }

}
