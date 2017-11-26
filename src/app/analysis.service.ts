import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class AnalysisService {
  constructor(private http : HttpClient) { }

  getData(){
  	return this.http.get("../assets/analysis.json").map(result => {
  		return result;
  	});
  }

}
