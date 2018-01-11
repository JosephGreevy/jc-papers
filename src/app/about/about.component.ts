import { Component, OnInit } from '@angular/core';
import { CurrentUserService} from '../current-user.service';
import { FlashService } from '../flash.service';

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
  	private userService : CurrentUserService) { }

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
