import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from '../current-user.service';
import { FlashService } from '../flash.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn;
  check;
  username;


  constructor(private http : HttpClient,
  			    private userService: CurrentUserService,
  			    private router : Router,
            private flashService : FlashService) {
    this.userService.makeCheck.subscribe(val => {
      console.log(val);
      this.check = val;
      this.isLoggedIn();
    })
  }

  ngOnInit() {
  	this.isLoggedIn();
  }
  logout(){
  	this.userService.logout().subscribe(
  		res => {
  			console.log(res);
        this.isLoggedIn();
        this.userService.makeCheck.next("Observable is firing to logout user");
        this.flashService.changeMessage("Successfully logged out");
        this.flashService.changeSuccess(false);
  			this.router.navigate([""]);

  		}
	)
  }
  isLoggedIn(){
    console.log("Checking if logged in");
    this.userService.getCurrentUser().subscribe(
      res => {
        console.log(res);
        if(this.isEmpty(res)){
          console.log("User is not logged in");
          this.loggedIn = false;
        }else{
        	console.log(res);
          this.loggedIn = true;
          if(res["local"]){
            this.username = res["local"]["username"];
          }else{
            this.username = res["facebook"]["name"];
          }
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
