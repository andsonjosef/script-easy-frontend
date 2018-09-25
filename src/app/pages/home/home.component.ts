import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsDTO } from '../../models/credentials.dto';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  creds: CredentialsDTO = {
    email: "",
    password: ""
  };

  constructor( public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    console.log(this.creds.email, this.creds.password);
    this.auth.authenticate(this.creds)
    .subscribe(response => {
        this.auth.sucessfullLogin(response.headers.get("Authorization"));
        this.router.navigate(['bases']);
    },
    error=>{})
  }

}
