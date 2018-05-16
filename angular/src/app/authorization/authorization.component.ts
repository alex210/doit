import { Component, OnInit } from '@angular/core';
import { AutorizationService } from './authorization.service';
import { User } from '../user';
import { NgForm } from '@angular/forms'; 

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

  signUp(form: NgForm){
    if(form.valid){
      this.user = form.value;
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
    		);
    }
  }

  signIn(form: NgForm){
    if(form.valid){
      this.userin = form.value;
      this.autorizationService.signIn(this.userin)
        .subscribe((data: any) => {
          if(data){         
            localStorage.setItem('name', data.name);
            localStorage.setItem('login', this.userin.login);
            localStorage.setItem('password', this.userin.password);
            this.isAuthenticated = true;

            this.user.name = localStorage.getItem('name');
            this.user.login = localStorage.getItem('login');
            this.user.password = localStorage.getItem('password');
    			} else {
    				this.wrong = true;
    				setTimeout(() => {this.wrong = false}, 3000);
    			}
    		})
    }
  }

  signOut(){
    localStorage.clear();
    location.reload();
  }

  autorization(){
    this.autorizationService.checkAutorization()
      .subscribe((data) => {
      	this.user.name = localStorage.getItem('name');
      	this.user.login = localStorage.getItem('login');
      	this.user.password = localStorage.getItem('password');
        if(data){
        	this.isAuthenticated = true;
        }
    	},
      error => console.log(error)
    );
  }

  ngOnInit() {
    this.autorization();
  }

}
