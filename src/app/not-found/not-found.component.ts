import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashService } from '../flash.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {
	message;
	success;
  constructor(private flashService : FlashService) { }

  ngOnInit() {
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
