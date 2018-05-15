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
	user: User = new User();

  constructor(private autorizationService: AutorizationService) {}

  sign(){
  	this.autorizationService.getAutorization(this.user)
  		.subscribe((data) => {
        if(data){
	  			this.isAuthenticated = true;
        } else {
          
        }
	  	},
	  	error => console.log(error)
  		)
  }

  ngOnInit() {
  //   this.autorizationService.getAutorization()
  //     .subscribe((data) => {
  //         console.log(data);
  //       if(!data){
  //         // this.user.login = data;
  //         // this.user.password = data;
  //       }
  //       error => console.log(error)
  //   });
  }

}
