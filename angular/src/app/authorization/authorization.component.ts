import { Component, OnInit } from '@angular/core';
import { AutorizationService } from './authorization.service';
import { User } from '../user';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
  providers: [AutorizationService]
})
export class AuthorizationComponent implements OnInit {
  isAuthenticated = false;
  isRegistredUser = false;
  wrong = false;
	user: User = new User();
	userin: User = new User();

  constructor(private autorizationService: AutorizationService) {}

  signUp(){
  	this.autorizationService.getAutorization(this.user)
  		.subscribe((data) => {
        if(data){
        	localStorage.setItem('name', this.user.name);
        	localStorage.setItem('login', this.user.login);
        	localStorage.setItem('password', this.user.password);
	  			this.isAuthenticated = true;
        } else {
          this.isRegistredUser = true;
          setTimeout(() => {this.isRegistredUser = false}, 3000);
        }
	  	},
	  	error => console.log(error)
  		)
  }

  signIn(){
  	this.autorizationService.signIn(this.userin)
  		.subscribe((data) => {
  			if(data){
  				localStorage.setItem('name', data.name);
        	localStorage.setItem('login', this.userin.login);
        	localStorage.setItem('password', this.userin.password);
        	this.isAuthenticated = true;
  			} else {
  				this.wrong = true;
  				setTimeout(() => {this.wrong = false}, 3000);
  			}
  		})
  }

  ngOnInit() {
    this.autorizationService.checkAutorization()
      .subscribe((data) => {
      	this.userin.name = localStorage.getItem('name');
      	this.userin.login = localStorage.getItem('login');
      	this.userin.password = localStorage.getItem('password');
        if(data){
        	this.isAuthenticated = true;
        }
    	},
      error => console.log(error)
    );
  }

}
