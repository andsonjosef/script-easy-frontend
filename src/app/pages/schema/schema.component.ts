import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { SchemaService } from '../../service/domain/schema-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SchemaDTO } from '../../models/schemas.dto';
import { BaseService } from '../../service/domain/base-service';
import { BaseDTO } from '../../models/bases.dto';
import { ToastsManager } from 'ng6-toastr';
import { MessageService } from '../../service/domain/message.service';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})
export class SchemaComponent implements OnInit {
  base: BaseDTO = {
    name: "",
    id: ""
  };
  sSchema: SchemaDTO = {
    name: "",
    id: "",
    base: {
      name: "",
      id: ""
    }
  };
  nSchema: SchemaDTO = {
    name: "",
    id: "",
    base: {
      name: "",
      id: ""
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
  schemas: SchemaDTO[] = [];
  constructor(
    
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public baseService: BaseService,
    public schemaService: SchemaService,
    public rParams: ActivatedRoute,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public message: MessageService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {

    this.id = parseInt(this.router.url.substring(this.router.url.indexOf("/bases/") + 7, this.router.url.indexOf("/schemas")));
   console.log("man " + this.id);
    this.getBase(this.id);

  }


  getBase(id: number) {
    this.baseService.find(id)
      .subscribe(response => {
        this.base = response;
        console.log("what about now ?" + this.base.id + " " + this.base.name);
         this.showSchemas(this.base, this.page, this.linesPerPage, this.orderBy, this.direction);
      },
        error => { this.toastr.error(this.message.getter()); });
  }

  select(schema: SchemaDTO) {
    this.sSchema = schema;
    console.log("selected " + this.sSchema);
  }

  showSchemas(base: BaseDTO, page: number, linesPerPage: number, orderBy: string, direction: string) {
    this.schemaService.findPage(base, page, linesPerPage, orderBy, direction)
      .subscribe(response => {
        this.schemas = this.schemas.concat(response['content']);
        this.numberOfPages = response['totalPages'];
        this.pages = [];
        this.total = this.schemas.length
        console.log("helo", this.schemas)
        for (var i = 0; i < this.numberOfPages; i++) {
          this.pages.push(i);

        }

      },
        error => { this.toastr.error(this.message.getter()); });
  }

  selectLines(event: any) {
    this.linesPerPage = event.target.value;
    this.schemas = [];
    this.showSchemas(this.base, this.page, this.linesPerPage, this.orderBy, this.direction);
  }

  selectPage(page: number) {
    this.page = page;

    this.schemas = [];
    this.showSchemas(this.base, this.page, this.linesPerPage, this.orderBy, this.direction);
  }

  nextPage() {
    this.page = this.page + 1;
    this.schemas = [];
    this.showSchemas(this.base, this.page, this.linesPerPage, this.orderBy, this.direction);
  }

  insert() {
    console.log("ok");
    this.nSchema.base = this.base;
    this.schemaService.insert(this.nSchema)
      .subscribe(response => {
        this.schemas = [];
        this.showSchemas(this.base, this.page, this.linesPerPage, this.orderBy, this.direction);
        this.toastr.success('Schema created!', 'Success!');
        this.closeNewModal.nativeElement.click();
      },
        error => { this.toastr.error(this.message.getter()); });

  }

  update() {
    this.baseService.find(this.id)
    .subscribe(response => {
      this.base = response;
      this.sSchema.base = this.base;
      console.log("not again! " + this.sSchema.id + this.sSchema.name + this.sSchema.base.id + this.sSchema.base.name)
      this.schemaService.update(this.sSchema)
      .subscribe(response => {
        this.schemas = [];
        this.showSchemas(this.base, this.page, this.linesPerPage, this.orderBy, this.direction);
        this.toastr.success('Schema updated!', 'Success!');
        document.getElementById('newModal').click();
        this.closeUpdateModal.nativeElement.click();

      },
        error => { this.toastr.error(this.message.getter()); });
    },
      error => { this.toastr.error(this.message.getter()); });

   

  }

  delete() {
 this.baseService.find(this.id)
      .subscribe(response => {
        this.base = response;
        this.sSchema.base = this.base;
        console.log("not again! " + this.sSchema.id + this.sSchema.name + this.sSchema.base.id + this.sSchema.base.name)
        this.schemaService.delete(this.sSchema)
        .subscribe(response => {
          this.schemas = [];
          this.showSchemas(this.base, this.page, this.linesPerPage, this.orderBy, this.direction);
          this.toastr.success('Schema deleted!', 'Success!');
          this.closeDeleteModal.nativeElement.click();
  
        },
          error => { this.toastr.error(this.message.getter()); });
      },
        error => { this.toastr.error(this.message.getter()); });
   

  }


  previousPage() {
    this.page = this.page - 1;
    this.schemas = [];
    this.showSchemas(this.base, this.page, this.linesPerPage, this.orderBy, this.direction);
  }

}
