import { Component, OnInit,  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PapersService } from '../papers.service';
import { SubjectService } from '../subject.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.css']
})
export class PapersComponent implements OnInit {
  data;
  selectedSubject;
  level;
  years;
  subject;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PapersService,
    private subjectService: SubjectService
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
      this.subjectService.changeSubject(this.format(this.selectedSubject));
    });
  }
  ngOnInit() {
    
  	
    this.route.paramMap.subscribe((params: ParamMap) =>{
      this.selectedSubject = params.get('subject');
      this.level = params.get('level');
      this.update();
    }); 
    
  }

}
