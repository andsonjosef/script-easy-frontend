import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { BaseDTO } from '../../models/bases.dto';
import { SchemaDTO } from '../../models/schemas.dto';
import { TableDTO } from '../../models/tables.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from '../../service/domain/base-service';
import { SchemaService } from '../../service/domain/schema-service';
import { ToastsManager } from 'ng6-toastr';
import { MessageService } from '../../service/domain/message.service';
import { TableService } from '../../service/domain/table-service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

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
  sTable: TableDTO = {
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
  nTable: TableDTO = {
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
  tables: TableDTO[] = [];

  constructor(private router: Router,
    public tableService: TableService,
    public schemaService: SchemaService,
    public rParams: ActivatedRoute,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public message: MessageService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.id = parseInt(this.router.url.substring(this.router.url.indexOf("/schemas/") + 9, this.router.url.indexOf("/tables")));
    this.getSchema(this.id);
  }

  getSchema(id: number) {
    this.schemaService.find(id)
      .subscribe(response => {
        this.schema = response;
         this.showTables(this.schema, this.page, this.linesPerPage, this.orderBy, this.direction);
      },
        error => { this.toastr.error(this.message.getter()); });
  }

  select(table: TableDTO) {
    this.sTable = table;
  }

  showTables(schema: SchemaDTO, page: number, linesPerPage: number, orderBy: string, direction: string) {
    this.tableService.findPage(schema, page, linesPerPage, orderBy, direction)
      .subscribe(response => {
        this.tables = this.tables.concat(response['content']);
        this.numberOfPages = response['totalPages'];
        this.pages = [];
        this.total = this.tables.length
        for (var i = 0; i < this.numberOfPages; i++) {
          this.pages.push(i);

        }

      },
        error => { this.toastr.error(this.message.getter()); });
  }

  selectLines(event: any) {
    this.linesPerPage = event.target.value;
    this.tables = [];
    this.showTables(this.schema, this.page, this.linesPerPage, this.orderBy, this.direction);
  }

  selectPage(page: number) {
    this.page = page;

    this.tables = [];
    this.showTables(this.schema, this.page, this.linesPerPage, this.orderBy, this.direction);
  }

  previousPage() {
    this.page = this.page - 1;
    this.tables = [];
    this.showTables(this.schema, this.page, this.linesPerPage, this.orderBy, this.direction);
  }
  nextPage() {
    this.page = this.page + 1;
    this.tables = [];
    this.showTables(this.schema, this.page, this.linesPerPage, this.orderBy, this.direction);
  }

  insert() {
    this.nTable.schema = this.schema;
    this.tableService.insert(this.nTable)
      .subscribe(response => {
        this.tables = [];
        this.showTables(this.schema, this.page, this.linesPerPage, this.orderBy, this.direction);
        this.toastr.success('Table created!', 'Success!');
        this.closeNewModal.nativeElement.click();
      },
        error => { this.toastr.error(this.message.getter()); });

  }

  update() {
    this.schemaService.find(this.id)
    .subscribe(response => {
      this.schema = response;
      this.sTable.schema = this.schema;
      this.tableService.update(this.sTable)
      .subscribe(response => {
        this.tables = [];
        this.showTables(this.schema, this.page, this.linesPerPage, this.orderBy, this.direction);
        this.toastr.success('table updated!', 'Success!');
        document.getElementById('newModal').click();
        this.closeUpdateModal.nativeElement.click();

      },
        error => { this.toastr.error(this.message.getter()); });
    },
      error => { this.toastr.error(this.message.getter()); });
  }

  delete() {
    this.schemaService.find(this.id)
      .subscribe(response => {
        this.schema = response;
        this.sTable.schema = this.schema;
        this.tableService.delete(this.sTable)
          .subscribe(response => {
            this.tables = [];
            this.showTables(this.schema, this.page, this.linesPerPage, this.orderBy, this.direction);
            this.toastr.success('Table deleted!', 'Success!');
            this.closeDeleteModal.nativeElement.click();

          },
            error => { this.toastr.error(this.message.getter()); });
      },
        error => { this.toastr.error(this.message.getter()); });
  }

  showAttributes(table: TableDTO) {
    this.tableService.setter(table)
    this.router.navigate([(`/tables/${table.id}/attributes/page`)]);

}

}
