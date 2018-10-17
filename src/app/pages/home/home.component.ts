import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsDTO } from '../../models/credentials.dto';
import { AuthService } from '../../service/auth-service';
import { ToastsManager } from 'ng6-toastr';
import { MessageService } from '../../service/domain/message.service';


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

  page: number = 0;
  linesPerPage: number = 24;
  orderBy: string = 'name';
  direction: string = 'ASC';

  constructor(
    public auth: AuthService,
     private router: Router, 
     public toastr: ToastsManager, 
     vcr: ViewContainerRef, 
     public message: MessageService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.sucessfullLogin(response.headers.get("Authorization"));
        this.router.navigate(["/bases/page"]);
      },
        error => {
          this.toastr.error(this.message.getter());
        })
  }
  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
  }
  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }
  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }
  showInfo() {
    this.toastr.info('Just some information for you.');
  }

  showCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
  }

}
