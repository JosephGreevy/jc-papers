import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'except',
  pure: false
 
})
export class ExceptPipe implements PipeTransform {

  transform(subjects: string[], selected: string): any {
    return subjects.filter(subject => {
    	return subject.toLowerCase() != selected.toLowerCase();
    });
  }

}
