import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CurrentUserService } from '../current-user.service';
import { FlashService } from '../flash.service';
import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  user: User;
  message;
  success;
  justLoggedIn = false;
  constructor(private http: HttpClient, 
              private router: Router, 
              private _location : Location,
              private userService : CurrentUserService,
              private flashService : FlashService
              ) { }

  ngOnInit() {
  	this.user = {
		    username: '',
        email: '',
        password: ''
  	}
    this.flashService.success.subscribe(success => {
      this.success = success;
    });
    this.flashService.message.subscribe(message => {
      this.message = message;
    });
    if(this.isLoggedIn()){
      this.router.navigate([""]);
    }
  }

  register(value){
    return this.http.post('/register', value).subscribe(
      res => {
        console.log("What a fucking success");
        this.userService.makeCheck.next("Observable has fired!");
        this.flashService.changeMessage("Registration was a success. You are now logged in.");
        this.flashService.changeSuccess(true);
        this.justLoggedIn= true;
        this._location.back();
      },
      err => {
        console.log("Just another fuck up");
        this.flashService.changeMessage("Registration failed. Username or email is already taken");
        this.flashService.changeSuccess(false);
      },
      () =>{
        console.log("Finished I think");
      }
    );
  }
  validateUsername(val){
    return true;
  }
  validateEmail(val){
    return true;
  }
  isValid(form){
    return form.valid;
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
    if(!this.isLoggedIn() && !this.justLoggedIn){
      console.log("Deleting Flash Message");
      this.flashService.changeMessage("");
    }
  }
}
