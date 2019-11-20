import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Flight } from '../models/flight';
import { Observable } from 'rxjs';



@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    create(user: User) {
        return this.http.post<User>('http://localhost:8080/user/adduser', user);
    }

    validate(user: User) {
        return this.http.post<User>('http://localhost:8080/user/verifyUser', user);
    }

    searchFlights(flight: Flight) {
        return this.http.post<Flight>('http://localhost:8080/flight/getFlights', flight);
    }

    // update(user: User):Observable<any> {
    //     return this.http.put('/api/users/' + user.id, user);
    //}

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
}
