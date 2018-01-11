import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class CurrentUserService {

  public makeCheck: Subject<any> = new Subject<any>();
  constructor(private http : HttpClient) { }

  getCurrentUser(){
  	return this.http.get("/api/current-user");
  }
  logout(){
  	return this.http.get("/logout");
  }

}
