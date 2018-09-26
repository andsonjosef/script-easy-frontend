import { Component, OnInit } from '@angular/core';
import { SchemaService } from '../../service/domain/schema-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SchemaDTO } from '../../models/schemas.dto';
import { BaseService } from '../../service/domain/base-service';
import { BaseDTO } from '../../models/bases.dto';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})
export class SchemaComponent implements OnInit {
  private base:BaseDTO;
  schemas : SchemaDTO[];
  constructor(
    public baseService: BaseService,
    public schemaService: SchemaService,
    private router: Router,
    public rParams: ActivatedRoute,) { }

  ngOnInit() {
   this.base = this.baseService.getter();
   
   this.schemaService.findSchemas(this.base.id)
      .subscribe(response => {
        this.schemas = response;
      },
        error => { });
    console.log(this.schemas);
  }

}
