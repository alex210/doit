import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { User } from '../user';

@Injectable()
export class AutorizationService {
	constructor(private http: HttpClient){}

	getAutorization(user){
		return this.http.post('http://localhost:3000/auth', user);
	}

}