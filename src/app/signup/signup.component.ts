import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private _AuthenticationService:AuthenticationService,
    private _Router:Router
  ) { }

  signupForm:FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$')]),
    age: new FormControl(null, [Validators.required])
  })

  ngOnInit(): void {
  }

  signup(signup:FormGroup){
    this._AuthenticationService.signup(signup.value).subscribe(
      ()=>{
        this._Router.navigate(['/welcome/login']);
      }
    );
  }

}
