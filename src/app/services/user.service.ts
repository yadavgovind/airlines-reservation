import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Flight } from '../models/flight';
import { Observable, Subject } from 'rxjs';
import { City } from '../models/city';
import { FlightFilter } from '../models/FlightFilter';
 



@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    private loginUser:User=undefined;
    private isLogin:boolean=false;
    private apiurl = 'http://localhost:8090/';
    private subject = new Subject<any>() ;
    getById(id: number) {
        
        return this.http.get('/api/users/' + id);
    }
    create(user: User) {
        return this.http.post<User>(this.apiurl+'open/user', user);
    }
    validate(user: User) {
        return this.http.post<User>('http://localhost:8090/open/user/verifyUser', user);
    }
    authenticate(user: User){
      return this.http.post<any>(this.apiurl+'open/authenticate',user);
    }

    searchFlights(flightFilter: any) {
        const options = {
            headers: new HttpHeaders({'Authorization':  sessionStorage.getItem("JWT_TOKEN")})
          }
        return this.http.post<any>(this.apiurl+'flight/getFlights', flightFilter,options);
    }
    getCity(){
        const options = {
            headers: new HttpHeaders({'Authorization':  sessionStorage.getItem("JWT_TOKEN")})
          }
        return this.http.get<any>(this.apiurl+'flight/cities',options);
    }

    getReserVationDeatils(){
        const options = {
            headers: new HttpHeaders({'Authorization':  sessionStorage.getItem("JWT_TOKEN")})
          }
    return this.http.get<any>(this.apiurl+'reservations',options);
    }      

    cancelReservation(reservationId: number){
        const options = {
            headers: new HttpHeaders({'Authorization':  sessionStorage.getItem("JWT_TOKEN")})
          }
            return this.http.get<any>(this.apiurl+'reservation/'+ reservationId ,options);
    }                               

    // update(user: User):Observable<any> {
    //     return this.http.put('/api/users/' + user.id, user);
    //}

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }

    bookFlight(bookDetails: any){
        const options = {
            headers: new HttpHeaders({'Authorization':  sessionStorage.getItem("JWT_TOKEN")})
          }
        return this.http.post<any>(this.apiurl+'reservation',bookDetails,options);
    }

    me(){
        const options = {
            headers: new HttpHeaders({'Authorization':  sessionStorage.getItem("JWT_TOKEN")})
          }
          return this.http.get<User>(this.apiurl+'me',options);
    }
    passenger(pnr){
        const options = {
            headers: new HttpHeaders({'Authorization':  sessionStorage.getItem("JWT_TOKEN")})
          }
          return this.http.get<any>(this.apiurl+'passengers/'+pnr,options);
    }
    setSeat(details){
        const options = {
            headers: new HttpHeaders({'Authorization':  sessionStorage.getItem("JWT_TOKEN")})
          }
          return this.http.post<any>(this.apiurl+'changeSeat',details,options);
    }
    setLoginUser(user:User){
        this.loginUser=user;
        this.subject.next(user);
    }
    getLoginUser():User{
        return this.loginUser;
    }
    isUserLoggedIn(){
        return this.loginUser==undefined?false:true;
    }
    getLoginEvent(): Observable<any> {
        return this.subject.asObservable();
    }


    getFlights(){
        const options = {
            headers: new HttpHeaders({'Authorization':  sessionStorage.getItem("JWT_TOKEN")})
          }
        return this.http.get<any>(this.apiurl+'flight/fights',options);
    }

    cancelFlight(flightShedule: any){
        const options = {
            headers: new HttpHeaders({'Authorization':  sessionStorage.getItem("JWT_TOKEN")})
          }

        return this.http.post<any>(this.apiurl+'cancelFlight', flightShedule, options);
    }
} 
