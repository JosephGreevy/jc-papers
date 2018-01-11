import { Component, OnInit, OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CurrentUserService } from '../current-user.service';
import { FlashService } from '../flash.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  message;
  success;
  justLoggedIn = false;

  constructor(private http : HttpClient,
              private router : Router,
              private _location : Location,
              private userService : CurrentUserService,
              private flashService : FlashService) { }

  ngOnInit() {

    if(this.isLoggedIn()){
      this.flashService.changeMessage("You are already logged in.");
      this.flashService.changeSuccess(false);
      this.router.navigate([""]);
    }
    this.flashService.success.subscribe(success => {
      this.success = success;
    });
    this.flashService.message.subscribe(message => {
      this.message = message;
    });
  }
  login(value){
  	return this.http.post("/login", value).subscribe(
  		res => {
        console.log("Successful Login Attempt");
        this.userService.makeCheck.next("Observable has fired");
        this.flashService.changeMessage("You successfully logged in");
        this.flashService.changeSuccess(true);
        this.justLoggedIn = true;
        this._location.back();
  		},
  		err => {
  			console.log(err);
        this.flashService.changeMessage("Login failed. Username or Password is incorrect");
        this.flashService.changeSuccess(false);
  		},
  		() => {
  			console.log("done");
  		}
	)
  }
  isLoggedIn(){
    console.log("Checking if logged in");
    this.userService.getCurrentUser().subscribe(
      res => {
        console.log(res);
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
  ngOnDestroy(){
    if(!this.justLoggedIn && !this.isLoggedIn()){
      this.flashService.changeMessage("");
    }
  }

}
