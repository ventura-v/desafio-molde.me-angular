import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from './user';
import { TokenParams } from "../../Classes/TokenParams"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: User = new User()

  hide = true;

  tokenParam: TokenParams

  constructor(
    private router: Router,
    public authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  loginSubmit(email: string, password: string) {
    // this.authService.userLogin(this.user)
    const url = 'https://recrutamento.molde.me/login';
    const body = JSON.stringify({ email: this.user.email, password: this.user.password });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(url, body, { headers: headers }).subscribe(
      (data) => {
        console.log(data);
        this.tokenParam = data
        localStorage.setItem('token', this.tokenParam.auth_token)
        console.log(localStorage.getItem('token'));
        if (!this.authService.AccessToken) {
          this.authService.AccessToken = this.tokenParam.auth_token
        }

        this.user.token = this.authService.AccessToken
        this.authService.authUser = true
        this.authService.userLogin(this.user)
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
          this.authService.authUser = false;
        } else {
          console.log('Server-side error occured.');
          console.log(err.error);
          this.authService.authUser = false;
        }
      }
    )
  }

  navigateToHome(): void {
    this.router.navigate(['/'])
  }

}
