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

  page : number = 0;
  linesPerPage : number = 24;
  orderBy: string = 'name';
  direction: string = 'ASC';

  constructor( public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(){
  
    this.auth.authenticate(this.creds)
    .subscribe(response => {
        this.auth.sucessfullLogin(response.headers.get("Authorization"));
        this.router.navigate(["/bases/page"]);
    },
    error=>{})
  }

}
