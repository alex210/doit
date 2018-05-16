import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable()
export class AutorizationService {
	constructor(private http: HttpClient){}

	// getAutorization(user: User){
	// 	return this.http.post('http://localhost:3000/auth', user);
	// }

	getAutorization(user){
		let headers = new HttpHeaders().set('Authorization', 'Basic '+btoa(`${user.login}:${user.password}`));
		return this.http.post('http://localhost:3000/auth', user,{
			headers: headers
		});
	}

	checkAutorization(){
		let headers = new HttpHeaders().set('Authorization', 'Basic '+btoa(`${localStorage.getItem('login')}:${localStorage.getItem('password')}`));
		return this.http.post('http://localhost:3000/check', '',{
			headers: headers
		});
	}

	signIn(user){
		let headers = new HttpHeaders().set('Authorization', 'Basic '+btoa(`${user.login}:${user.password}`));
		return this.http.post('http://localhost:3000/signin', '',{
			headers: headers
		});
	}

}