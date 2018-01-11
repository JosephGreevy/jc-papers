import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PapersService } from '../papers.service';
import { SubjectService } from '../subject.service';
import { FlashService } from '../flash.service';



@Component({
  selector: 'subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit, OnDestroy {
  subjects;
  data;
  selectedSubject;
  level;
  feature;
  message;
  success;

  constructor(private dataService: PapersService, 
              private subjectService: SubjectService, 
              private router : Router,
              private flashService : FlashService) { }

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
    this.subjectService.feature.subscribe(feature => {
      this.feature = feature;
    });
    this.flashService.success.subscribe(success => {
      this.success = success;
    });
    this.flashService.message.subscribe(message => {
      this.message = message;
    });
  }
  changeSubject(name: string){
    this.subjectService.changeSubject(name);
    console.log(this.level);
    console.log(this.selectedSubject);
    this.router.navigate(['/subjects', this.level, this.selectedSubject.toLowerCase(), this.feature]);
  }
  ngOnDestroy(){
    this.flashService.changeMessage("");
  }

}
