import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: boolean = false;
  loginMessage : string = 'Have already an account? Sign in!';
  registerMessage : string = 'Not yet registered? Welcome and enjoy!'

  constructor() {
  }

  signIn(event: any) {
    event.preventDefault();
    this.login = !this.login ;
  }

  ngOnInit(): void {

  }

}
