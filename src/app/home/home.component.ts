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
  savedTitle:string = '';
  savedDescription:string ='';
  displayUpdate:boolean = false;
  notesCount:number =0;

  addNote:FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    desc:new FormControl(null, Validators.required),
    userID: new FormControl(this._AuthenticationService.userData.value._id),
    token: new FormControl(localStorage.getItem('userToken')?.replace(/"/g, ""))
  });

  updateNote:FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    desc:new FormControl(null, Validators.required),
    NoteID: new FormControl(null),
    token: new FormControl(null)
  });

  ngOnInit(): void {
    this.callNotes();
  }

  callNotes(){
    this._NotesService.getUserNotes().subscribe(
      (data)=>{
        if(data.Notes!=null){
          this.notesCount = Array.from(data.Notes)?.length;
        }
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
    this._NotesService.addNote(addNote.value).subscribe(
      (data)=>{
        this.hideNote();
        this.callNotes();
      }
    );
  }

  editNote(note:any){
    this.savedTitle =note.title;
    this.savedDescription = note.desc;
    this.updateNote.setValue({
      title: note.title,
      desc:note.desc,
      NoteID: note._id,
      token:localStorage.getItem('userToken')?.replace(/"/g, "")
    })
    this.displayUpdate = true;
  }

  deleteNote(id:string){
    let token = {
      NoteID:id,
      token:localStorage.getItem('userToken')?.replace(/"/g, "")
    }
    console.log(token);
    this._NotesService.deleteNote(token).subscribe(
      ()=>{
        this.callNotes();
      }
    );
  }

  hideUpdate(){
    this.displayUpdate = false;
  }

  sendUpdate(updateNote:FormGroup){
    this._NotesService.updateNotes(updateNote.value).subscribe(
      ()=>{
        this.displayUpdate = false;
        this.callNotes();
      }
    );
  }

}