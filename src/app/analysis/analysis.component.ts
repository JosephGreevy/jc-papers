import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  selectedSubject = "unavailable";
  level = "unavailable";	

  constructor() { }

  ngOnInit() {
  	
  }

}
