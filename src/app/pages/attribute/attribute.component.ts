import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { BaseDTO } from 'src/app/models/bases.dto';
import { SchemaDTO } from 'src/app/models/schemas.dto';
import { TableDTO } from 'src/app/models/tables.dto';
import { AttributeDTO } from 'src/app/models/attributes.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { TableService } from 'src/app/service/domain/table-service';
import { SchemaService } from 'src/app/service/domain/schema-service';
import { ToastsManager } from 'ng6-toastr';
import { MessageService } from 'src/app/service/domain/message.service';
import { AttributeService } from 'src/app/service/domain/attribute-service';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {
  base: BaseDTO = {
    name: "",
    id: ""
  };
  schema: SchemaDTO = {
    name: "",
    id: "",
    base: {
      name: "",
      id: ""
    }
  };
  table: TableDTO = {
    name: "",
    id: "",
    schema: {
      name: "",
      id: "",
      base: {
        name: "",
        id: ""
      }
    }
  };
  sAttribute: AttributeDTO = {
    id: "",
    ai: false,
    defaultA: "",
    indexA: "",
    name: "",
    nullA: false,
    size: 0,
    type: "",
    comment: "",
    referencesTable: "",
    table: {
      name: "",
      id: "",
      schema: {
        name: "",
        id: "",
        base: {
          name: "",
          id: ""
        }
      }
    }
  };
  nAttribute: AttributeDTO = {
    id: "",
    ai: false,
    defaultA: "",
    indexA: "",
    name: "",
    nullA: false,
    size: 0,
    type: "",
    comment: "",
    referencesTable: "",
    table: {
      name: "",
      id: "",
      schema: {
        name: "",
        id: "",
        base: {
          name: "",
          id: ""
        }
      }
    }
  };
  pages: number[];
  linesValue: number[] = [1, 2, 3, 4];
  page: number = 0;
  linesPerPage: number = 24;
  orderBy: string = 'name';
  direction: string = 'ASC';
  numberOfPages: number = 0;
  total: number;
  id: number;
  @ViewChild('closeNewModal') closeNewModal: ElementRef;
  @ViewChild('closeUpdateModal') closeUpdateModal: ElementRef;
  @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef;
  attributes: AttributeDTO[] = [];
  constructor(private router: Router,
    public tableService: TableService,
    public attributeService: AttributeService,
    public rParams: ActivatedRoute,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public message: MessageService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.id = parseInt(this.router.url.substring(this.router.url.indexOf("/tables/") + 8, this.router.url.indexOf("/attributes")));
    this.getTable(this.id);
  }

  getTable(id: number) {
    this.tableService.find(id)
      .subscribe(response => {
        this.table = response;
         this.showAttributes(this.table, this.page, this.linesPerPage, this.orderBy, this.direction);
      },
        error => { this.toastr.error(this.message.getter()); });
  }

  showAttributes(table: TableDTO, page: number, linesPerPage: number, orderBy: string, direction: string) {
    this.attributeService.findPage(table, page, linesPerPage, orderBy, direction)
      .subscribe(response => {
        this.attributes = this.attributes.concat(response['content']);
        this.numberOfPages = response['totalPages'];
        this.pages = [];
        this.total = this.attributes.length
        for (var i = 0; i < this.numberOfPages; i++) {
          this.pages.push(i);

        }

      },
        error => { this.toastr.error(this.message.getter()); });
  }

  new() {
    
    this.router.navigate([(`/tables/${this.id}/newAttribute`)]);

}
}
