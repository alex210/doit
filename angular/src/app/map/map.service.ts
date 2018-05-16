import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MapService {
	constructor(private http: HttpClient){}

	setMarkers(user, markers){
		let headers = new HttpHeaders().set('Authorization', 'Basic '+btoa(`${user.login}:${user.password}`));
		return this.http.post('http://localhost:3000/markers', markers,{
			headers: headers
		});
	}

	getMarkers(user){
		let headers = new HttpHeaders().set('Authorization', 'Basic '+btoa(`${user.login}:${user.password}`));
		return this.http.get('http://localhost:3000/get-markers', {
			headers: headers
		});
	}

}