import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PapersService } from '../papers.service';
import { SubjectService } from '../subject.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

	data;
	selectedSubject;
	selectedYear;
	_years;
	papers;
	isHigherLevel;
	level;
  subjectChanged : boolean;
  feature : string;

  constructor(private dataService : PapersService, 
              private subjectService: SubjectService, 
              private router: Router) {
                 
               }

  ngOnInit() {
  	this.dataService.getData().subscribe(result => {
  		this.data = result;
  	})
    this.subjectService.selectedSubject.subscribe(name => {
      this.selectedSubject = name;
    })
    this.subjectService.level.subscribe(lvl => {
      this.level = lvl;
      if(this.level == "hl"){
        this.isHigherLevel = true;
      }else{
        this.isHigherLevel = false;
      }
    })
    this.subjectService.feature.subscribe(f => {
      this.feature = f;
      console.log(f);
    })
  }
  toggleSubjects(event){
    let list = document.querySelector(".subjects ul");
    if(event.target.classList.contains("expanded")){
      this.selectedSubject = event.target.innerText.toLowerCase();
      this.subjectService.changeSubject(this.selectedSubject);
      this.router.navigate(['/subjects', this.level, this.selectedSubject, this.feature]);
    }else{
      if(event.target.classList.contains("select_expanded")){
        this.close();
      }else{
        this.open();
      }
    }
  }
  toggleLevel(event){
  	this.isHigherLevel = !this.isHigherLevel;
  	if(this.isHigherLevel){
  		this.level = "hl";
  	}else{
  		this.level = "ol";
  	}
    this.subjectService.changeLevel(this.level);
    if(this.selectedSubject != "Subjects"){
      this.router.navigate(['/subjects', this.level, this.selectedSubject, this.feature]);
    }
  }
  changeFeature(event){
    let temp = event.target.innerText.toLowerCase();
    if(this.feature != temp){
      this.feature = temp;
      this.subjectService.changeFeature(this.feature);
      if(this.selectedSubject != "Subjects"){
        this.router.navigate(['/subjects', this.level, this.selectedSubject, this.feature]);
      }
    }
  }
  getPapers(){
  	this.papers = this.data[this.selectedSubject][this.level];
  }
  // Close and Open select
  close(){
    let subjects = document.querySelectorAll(".subjects ul li");
    for(let i = 0; i < subjects.length; i++){
      if(subjects[i].classList.contains("expanded")){
        subjects[i].classList.remove("expanded");
      }
    } 
    let selected = document.querySelector(".selected");
    if(selected){
      selected.classList.remove("select_expanded");
    }   }
  open(){
    let subjects = document.querySelectorAll(".subjects ul li");
    for(let i = 0; i < subjects.length; i++){
      if(!subjects[i].classList.contains("selected")){
        subjects[i].classList.add("expanded");
      }
    }
    let selected = document.querySelector(".selected");
    selected.classList.add("select_expanded");
  }
  format(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
