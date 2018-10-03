import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDTO } from '../../models/bases.dto';
import { BaseService } from '../../service/domain/base-service';
import { UserService } from '../../service/domain/user-service';
import { StorageService } from '../../service/storage.service';
import { UserDTO } from '../../models/user-dto';

@Component({
  selector: 'app-bases',
  templateUrl: './bases.component.html',
  styleUrls: ['./bases.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BasesComponent implements OnInit {


  user: UserDTO;
  nBase: BaseDTO = {
    name: "",
    id: "",
  };
  email: string;
  bases: BaseDTO[] = [];
  pages: number[];
  linesValue: number[] = [1, 2, 3, 4];
  page: number = 0;
  linesPerPage: number = 24;
  orderBy: string = 'name';
  direction: string = 'ASC';
  numberOfPages: number = 0;
  total: number;

  constructor(public baseService: BaseService, public storageService: StorageService, public userService: UserService, private router: Router) { }


  ngOnInit() {


    this.showBases(this.page, this.linesPerPage, this.orderBy, this.direction);


  }


  showSchemas(base: BaseDTO) {
    this.baseService.setter(base)
    this.router.navigate([(`/bases/${base.id}/schemas`)]);

  }

  showBases(page: number, linesPerPage: number, orderBy: string, direction: string) {
    this.baseService.findPage(page, linesPerPage, orderBy, direction)
      .subscribe(response => {
        this.bases = this.bases.concat(response['content']);
        this.numberOfPages = response['totalPages'];
        this.pages = [];
        this.total = this.bases.length

        for (var i = 0; i < this.numberOfPages; i++) {
          this.pages.push(i);
          console.log(this.pages)
        }

      },
        error => { });


  }

  selectLines(event: any) {
    this.linesPerPage = event.target.value;
    this.bases = [];
    this.showBases(this.page, this.linesPerPage, this.orderBy, this.direction);

  }

  selectPage(page: number) {
    this.page = page;

    this.bases = [];
    this.showBases(this.page, this.linesPerPage, this.orderBy, this.direction);

  }

  nextPage() {
    this.page = this.page + 1;
    this.bases = [];
    this.showBases(this.page, this.linesPerPage, this.orderBy, this.direction);
  }

  newBase() {
    console.log(this.nBase.name);
    this.baseService.insert(this.nBase)
    .subscribe(response => {
      this.bases = [];
      this.showBases(this.page, this.linesPerPage, this.orderBy, this.direction);
    },
    error => {});
  
  }


  previousPage() {
    this.page = this.page - 1;
    this.bases = [];
    this.showBases(this.page, this.linesPerPage, this.orderBy, this.direction);
  }
}


