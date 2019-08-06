import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: Boolean = false;
  title = 'stationary-mart-angular';
  isLoading: boolean;
  user: {};
  constructor(private service :AppService, private loader:LoaderService){

  }
  ngOnInit(){
    this.loader.getState().subscribe(status=>{
      this.isLoading = status;
    });
    if(this.service.loggedIn()){
      this.isLoggedIn = true;
      this.user = this.service.getUser();
    };
    this.service.loginHook().subscribe((user)=>{
      this.user = user;
      this.isLoggedIn = true;
    });
    this.service.logoutHook().subscribe(()=>{
      this.user = {};
      this.isLoggedIn = false;
    });
  }
  signout(){
    this.service.logout();
  }
}
