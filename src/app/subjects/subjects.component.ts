import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PapersService } from '../papers.service';
import { SubjectService } from '../subject.service';



@Component({
  selector: 'subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects;
  data;
  selectedSubject;
  level;

  constructor(private dataService: PapersService, private subjectService: SubjectService, private router : Router) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    });   
    this.subjectService.selectedSubject.subscribe(subject => {
      this.selectedSubject = subject;
    });
    this.subjectService.level.subscribe(level => {
      this.level = level;
    });
  }
  changeSubject(name: string){
    this.subjectService.changeSubject(name);
    console.log(this.level);
    console.log(this.selectedSubject);
    this.router.navigate(['/subjects', this.level, this.selectedSubject.toLowerCase()]);
  }

}
