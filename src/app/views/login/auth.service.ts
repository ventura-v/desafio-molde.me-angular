import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpClientModule } from '@angular/common/http'
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private authUser: boolean = false;
  authUser: boolean = false;

  showMenuEmitter = new EventEmitter<boolean>()

  AccessToken: string = ""

  constructor(private router: Router, private http: HttpClient) { }

  userLogin(user: User) {
    this.AccessToken = user.token
    console.log(user.token)
    if (user.email && user.password && this.authUser) {
      // this.authUser = true
      this.showMenuEmitter.emit(true)
      this.router.navigate(['/'])
    } else {
      this.showMenuEmitter.emit(false)
    }
  }

  isAuthenticated() {
    return this.authUser
  }

  getToken() {
    return localStorage.getItem('token')
  }

}
