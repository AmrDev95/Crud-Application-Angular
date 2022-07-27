import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { NotesService } from './../notes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _AuthenticationService:AuthenticationService,
    private _NotesService:NotesService
  ) { }

  displayNote:boolean = false;
  userNotes:any[] = [];

  addNote:FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    desc:new FormControl(null, Validators.required),
    userID: new FormControl(this._AuthenticationService.userData.value._id),
    token: new FormControl(localStorage.getItem('userToken')?.replace(/"/g, ""))
  });

  ngOnInit(): void {
    this.callNotes();
  }

  callNotes(){
    this._NotesService.getUserNotes().subscribe(
      (data)=>{
        console.log(data.Notes);
        this.userNotes = data.Notes;
      }
    );
  }

  showNote(){
    this.displayNote = true;
  }

  hideNote(){
    this.displayNote = false;
  }

  sendNote(addNote:FormGroup){
    console.log(addNote.value);
    this._NotesService.addNote(addNote.value).subscribe(
      (data)=>{
        console.log(data);
        this.hideNote();
        this.callNotes();
      }
    );
  }

}