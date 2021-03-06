import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PapersService } from '../papers.service';
import { SubjectService } from '../subject.service';
import { FlashService } from '../flash.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.css']
})
export class PapersComponent implements OnInit, OnDestroy {
  data;
  selectedSubject;
  level;
  years;
  subject;
  feature;
  message;
  success;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PapersService,
    private subjectService: SubjectService,
    private flashService : FlashService
  ) { }

  format(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  notFound(): boolean{
    let arr = this.data.subjects;
    for(let i = 0; i < arr.length; i++){
      if(arr[i].toLowerCase() == this.selectedSubject.toLowerCase()){
        return false;
      }
    }
    return true;
  }
  update(){
    this.service.getData().subscribe(data => {
      this.data = data;
      if(this.notFound()){
        this.router.navigate(['/notFound']);
      }
      this.years = this.data[this.selectedSubject.toLowerCase()].years;
      this.subject = this.data[this.selectedSubject.toLowerCase()][this.level];
      this.subjectService.changeSubject(this.selectedSubject);
      this.subjectService.changeLevel(this.level);
      this.subjectService.changeFeature('papers');
    });
  }
  ngOnInit() {
    
  	
    this.route.paramMap.subscribe((params: ParamMap) =>{
      this.selectedSubject = params.get('subject');
      this.level = params.get('level');
      this.update();
    }); 
    this.flashService.success.subscribe(success => {
      this.success = success;
    });
    this.flashService.message.subscribe(message => {
      this.message = message;
    });
    
  }
  ngOnDestroy(){
    this.flashService.changeMessage("");
  }

}
