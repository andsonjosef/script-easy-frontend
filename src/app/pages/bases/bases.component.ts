import { Component, OnInit } from '@angular/core';
import { BaseDTO } from '../../models/bases.dto';
import { Router } from '@angular/router';
import { BaseService } from '../../service/domain/base-service';

@Component({
  selector: 'app-bases',
  templateUrl: './bases.component.html',
  styleUrls: ['./bases.component.css']
})
export class BasesComponent implements OnInit {


  bases: BaseDTO[];
  constructor(public baseService: BaseService, private router: Router) { }

  ngOnInit() {
    this.baseService.findBases()
      .subscribe(response => {
        this.bases = response;
      },
        error => { });
  }


  showSchemas(base: BaseDTO) {
    this.baseService.setter(base)
    this.router.navigate([(`/bases/${base.id}/schemas`)]);
    

  }
}