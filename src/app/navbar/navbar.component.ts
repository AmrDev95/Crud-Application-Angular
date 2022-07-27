import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean = false;

  constructor(
    private _AuthenticationService:AuthenticationService,
    private _Router:Router
  ) { }

  ngOnInit(): void {

    this._AuthenticationService.userData.subscribe(
      ()=>{
        if(this._AuthenticationService.userData.getValue() !=null){
          this.isLoggedIn = true;
        }

        else{
          this.isLoggedIn = false;
        }
      }
    );
    
  }

  logout(){
    localStorage.removeItem('userToken');
    this._AuthenticationService.userData.next(null);
    this._Router.navigate(['/welcome']);
  }

}
