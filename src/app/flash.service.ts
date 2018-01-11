import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FlashService {

	private _successSource = new BehaviorSubject<boolean>(true);
	private _messageSource = new BehaviorSubject<string>("");

	success = this._successSource.asObservable();
	message = this._messageSource.asObservable();


  constructor() { }

  changeMessage(msg: string){
		this._messageSource.next(msg);
  }
  changeSuccess(bool: boolean){
  	this._successSource.next(bool);
  }

}
