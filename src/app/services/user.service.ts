import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Flight } from '../models/flight';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { FlightFilter } from '../models/FlightFilter';



@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    create(user: User) {
        return this.http.post<User>('http://localhost:8090/user/adduser', user);
    }

    validate(user: User) {
        return this.http.post<User>('http://localhost:8090/user/verifyUser', user);
    }

    searchFlights(flightFilter: any) {
        console.log("into service value is : "+flightFilter.arrivingCity)
        return this.http.post<any>('http://localhost:8090/flight/getFlights', flightFilter);
    }
getCity(){
    return this.http.get<any>('http://localhost:8090/flight/cities');
}
    // update(user: User):Observable<any> {
    //     return this.http.put('/api/users/' + user.id, user);
    //}

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }

    bookFlight(bookDetails: any){
return this.http.post<any>('http://localhost:8090/reservation',bookDetails);
    }
}
