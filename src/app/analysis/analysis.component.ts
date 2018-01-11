import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AnalysisService } from '../analysis.service';
import { SubjectService } from '../subject.service';
import { CurrentUserService } from '../current-user.service';
import { FlashService } from '../flash.service';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit, OnDestroy {
  selectedSubject = "unavailable";
  level = "unavailable";	
  feature = "analysis";
  data;
  analysis;
  categories;
  questions = [];
  showQuestion = [];
  loggedIn;
  message;
  success;

  constructor(private route : ActivatedRoute, 
              private router : Router, 
              private dataService : AnalysisService, 
              private subjectService : SubjectService,
              private userService : CurrentUserService,
              private flashService : FlashService) { }

  ngOnInit() {
  	this.route.paramMap.subscribe((params: ParamMap) =>{
      this.selectedSubject = params.get('subject').toLowerCase();
      this.level = params.get('level').toLowerCase();
      this.fetch();
    }); 
    this.flashService.success.subscribe(success => {
      this.success = success;
    });
    this.flashService.message.subscribe(message => {
      this.message = message;
    });
    this.isLoggedIn();
  }
  fetch(){
    this.subjectService.changeLevel(this.level);
    this.subjectService.changeSubject(this.selectedSubject);
    this.subjectService.changeFeature(this.feature);
    this.dataService.getData().subscribe(data => {
      if(data[this.selectedSubject]){
        this.data = data[this.selectedSubject];
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
    this.showQuestion = [];
    for(let i = 0; i < arr.length; i++){
      if(arr[i].tags.indexOf(cat) > -1){
        this.questions.push(arr[i]);
      }
    }
    for(let i = 0; i < this.questions.length; i++){
      this.questions[i].displayingQuestion = true;
    }
  }
  toggleDisplay(question){
    question.displayingQuestion = !question.displayingQuestion;
  }
  isLoggedIn(){
    this.userService.getCurrentUser().subscribe(
      res => {
        if(this.isEmpty(res)){
          this.loggedIn = false;
        }else{
          this.loggedIn = true;
        }
      }
    );
  }
  isEmpty(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }
  ngOnDestroy(){
    this.flashService.changeMessage("");
  }
}
