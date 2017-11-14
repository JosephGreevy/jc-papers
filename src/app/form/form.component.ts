import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
	isHigherLevel = true;
	level = "hl";
  subjectChanged : boolean;

  constructor(private dataService : PapersService, private subjectService: SubjectService, private router: Router) { }

  ngOnInit() {
  	this.dataService.getData().subscribe(result => {
  		this.data = result;
  	})
    this.subjectService.selectedSubject.subscribe(name => {
      this.selectedSubject = name;
    })
  }
  toggleSubjects(event){
    let list = document.querySelector(".subjects ul");
    if(event.target.classList.contains("expanded")){
      /*let sel = document.querySelector(".selected");
      if(sel.classList.contains("default")){
        sel.remove();
      }else{
        sel.classList.remove("selected");
        sel.classList.remove("select_expanded");
      }
      list.insertBefore(event.target, list.firstChild);
      this.close();
      this.selectedSubject = event.target.innerText;
      this.getYears();
      event.target.classList.add("selected");
      console.log("Trying");*/
      this.selectedSubject = event.target.innerText;
      this.subjectService.changeSubject(this.selectedSubject);
      this.router.navigate(['/subjects', this.level, this.selectedSubject]);
    }else{
      if(event.target.classList.contains("select_expanded")){
        this.close();
      }else{
        this.open();
      }
    }
  }
  /*selectSubject(name){
    let list = document.querySelector(".subjects ul");
    let items = document.querySelectorAll(".subjects ul li");
    let element;
    this.selectedSubject = name;
    for(let i = 0; i < items.length; i++){
      if(items[i].innerHTML == name){
        let sel = document.querySelector(".selected");
        if(sel.classList.contains("default")){
          sel.remove();
        }else{
          sel.classList.remove("selected");
          sel.classList.remove("select_expanded");
        }
        items[i].classList.add("selected");
        list.insertBefore(items[i], list.firstChild);
      }
    }}*/
  toggleLevel(event){
  	this.isHigherLevel = !this.isHigherLevel;
  	if(this.isHigherLevel){
  		this.level = "hl";
  	}else{
  		this.level = "ol";
  	}
    this.subjectService.changeLevel(this.level);
    if(this.selectedSubject != "Subjects"){
      this.router.navigate(['/subjects', this.level, this.selectedSubject]);
    }
  }
  /*getYears(){
    console.log(this.data[this.selectedSubject]);
  	this._years = this.data[this.selectedSubject].years;}*/
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

}
