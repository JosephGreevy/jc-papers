import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AnalysisService } from '../analysis.service';
import { SubjectService } from '../subject.service';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  selectedSubject = "unavailable";
  level = "unavailable";	
  feature = "analysis";
  analysis;
  categories;
  questions = [];

  constructor(private route : ActivatedRoute, 
              private router : Router, 
              private dataService : AnalysisService, 
              private subjectService : SubjectService) { }

  ngOnInit() {
  	this.route.paramMap.subscribe((params: ParamMap) =>{
      this.selectedSubject = params.get('subject').toLowerCase();
      this.level = params.get('level').toLowerCase();
      this.fetch();
    }); 

  }
  fetch(){
    this.subjectService.changeLevel(this.level);
    this.subjectService.changeSubject(this.selectedSubject);
    this.subjectService.changeFeature(this.feature);
    this.dataService.getData().subscribe(data => {
      if(data[this.selectedSubject]){
        this.analysis = data[this.selectedSubject][this.level];
        this.categories = data[this.selectedSubject].categories;
      }else{
        this.router.navigate(["/notFound"]);
      }
    });
  }
  updateQuestions(cat){
    let arr = this.analysis;
    this.questions = [];
    for(let i = 0; i < arr.length; i++){
      if(arr[i].tags.indexOf(cat) > -1){
        this.questions.push(arr[i]);
      }
    }
  }
}
