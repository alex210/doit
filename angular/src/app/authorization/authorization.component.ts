import { Component, OnInit } from '@angular/core';
import { AutorizationService } from './authorization.service';
// import { User } from '../user';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
  providers: [AutorizationService]
})
export class AuthorizationComponent {
	user = {
		login: '',
		password: ''
	}
	// user: User = new User();

  constructor(private autorizationService: AutorizationService) {}

  sign(){
  	this.autorizationService.getAutorization(JSON.stringify(this.user))
  		.subscribe((data) => {
	  			console.log(data);
	  		},
	  		error => console.log(error)
  		)
  }


  // ngOnInit() {
  // }

}
