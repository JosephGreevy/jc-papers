import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class PapersService {
  constructor(private http: HttpClient) { }

  getData(){
  	console.log("Getting Data");
  	return this.http.get('../assets/papers.json').map(result =>{
  		return result;
  	});
  }

}
