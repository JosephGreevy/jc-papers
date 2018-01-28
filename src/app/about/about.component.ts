import { Component, OnInit } from '@angular/core';
import { CurrentUserService} from '../current-user.service';
import { FlashService } from '../flash.service';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
	success;
	message;

  constructor(
  	private flashService : FlashService,
  	private userService : CurrentUserService,
    private title : Title,
    private meta : Meta
    ) {
    title.setTitle('About JC Papers');

    meta.addTags([
      { name: 'author',   content: 'juniorcertpapers.ie'},
      { name: 'keywords', content: 'junior cert, examinations, junior cert papers, past papers,'},
      { name: 'description', content: 'This is Junior Cert Papers' }
      ]);
   }

  ngOnInit() {
  	this.flashService.success.subscribe(success => {
      this.success = success;
    });
    this.flashService.message.subscribe(message => {
      this.message = message;
    });
    this.isLoggedIn();
  }
  isLoggedIn(){
    this.userService.getCurrentUser().subscribe(
      res => {
        if(this.isEmpty(res)){
          return false;
        }else{
          return true;
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

}
