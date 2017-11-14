import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SubjectService {

  private _selectedSubjectSource = new BehaviorSubject<string>("Subjects");
  private _levelSource = new BehaviorSubject<string>("hl");

  selectedSubject = this._selectedSubjectSource.asObservable();
  level = this._levelSource.asObservable();

  constructor() { }

  changeSubject(name: string){
  	this._selectedSubjectSource.next(name);
  }

  changeLevel(lvl: string){
  	this._levelSource.next(lvl);
  }

}
