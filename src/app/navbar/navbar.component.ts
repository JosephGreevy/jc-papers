import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from '../current-user.service';
import { FlashService } from '../flash.service';
import { ActivatedRoute, Router } from '@angular/router';

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
            private flashService : FlashService,
            private activatedRoute : ActivatedRoute) {
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
  			console.log("Logging Out and navigating to route");
        this.isLoggedIn();
        this.userService.makeCheck.next("Observable is firing to logout user");
        this.flashService.changeMessage("Successfully logged out");
        this.flashService.changeSuccess(false);
  			this.router.navigate(["/about"]);
  		},
      (err) => {
        console.log("Error trying to logout user", err);
      },
      () => {
        console.log("Completed Logout process");
      }
	)
  }
  isLoggedIn(){
    console.log("Checking if user is logged in from Navbar in isLoggedIn()");
    // Find current user 
    this.userService.getCurrentUser().subscribe(
      res => {
        console.log("Current user is ",res);
        if(this.isEmpty(res)){
          console.log("User is not logged in");
          this.loggedIn = false;
        }else{
          this.loggedIn = true;
          if(res["local"]){
            this.username = res["local"]["username"];
          }else{
            this.username = res["facebook"]["name"];
          }
        }
      },
      (err) => {
        console.log("Error when testing if user is logged in", err.message);
      },
      () => {
        console.log("Authentication status has been confirmed");
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
