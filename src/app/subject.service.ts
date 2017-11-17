import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SubjectService {

  private _selectedSubjectSource = new BehaviorSubject<string>("Subjects");
  private _levelSource = new BehaviorSubject<string>("hl");
  private _featureSource = new BehaviorSubject<string>("papers");

  selectedSubject = this._selectedSubjectSource.asObservable();
  level = this._levelSource.asObservable();
  feature = this._featureSource.asObservable();

  constructor() { }

  changeSubject(name: string){
  	this._selectedSubjectSource.next(name);
  }

  changeLevel(lvl: string){
  	this._levelSource.next(lvl);
  }
  changeFeature(feature : string){
    this._featureSource.next(feature);
  }

}
