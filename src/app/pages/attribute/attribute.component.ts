import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { BaseDTO } from 'src/app/models/bases.dto';
import { SchemaDTO } from 'src/app/models/schemas.dto';
import { TableDTO } from 'src/app/models/tables.dto';
import { AttributeDTO } from 'src/app/models/attributes.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { TableService } from 'src/app/service/domain/table-service';
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
  lindexs = ["", "PRIMARY", "FOREIGN", "UNIQUE"];
  dtypes = ["INT", "VARCHAR", "BOOLEAN", "DATE", "TEXT"];
  ntypes = ["TINYINT", "SMALLINT", "MEDIUMINT", "INT", "BIGINT", "DECIMAL", "FLOAT", "DOUBLE", "REAL", "BIT", "BOOLEAN", "SERIAL", "NUMERIC", "RAW"];
  ttypes = ["DATE", "DATETIME", "TIMESTAMP", "TIME", "YEAR"];
  stypes = ["CHAR", "VARCHAR", "TINYTEXT", "TEXT", "MEDIUMTEXT", "LONGTEXT", "BINARY", "VARBINARY", "TINYBLOB", "MEDIUMBLOB", "BLOB", "LONGBLOB", "ENUM", "SET", "CLOB"];
  srows: boolean[] = [];
  pages: number[];
  linesValue: number[] = [1, 2, 3, 4];
  page: number = 0;
  linesPerPage: number = 24;
  orderBy: string = 'name';
  direction: string = 'ASC';
  numberOfPages: number = 0;
  total: number;
  id: number;
  search: string;
  list: string = "";
  eAttributes: string[] = [];
  sAttributes: AttributeDTO[] = [];
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

        let j = 0;
        let length = 0;

        if (this.attributes.length > this.linesPerPage) {
          length = this.linesPerPage;
        } else {
          length = this.attributes.length;

        }

        while (j < length) {
          this.srows.push(false);

          j++;
        }

      },
        error => { this.toastr.error(this.message.getter()); });
  }

  sorting(sort: string) {
    if (sort == this.orderBy) {
      if (this.direction == "ASC") {
        this.direction = "DESC"
      } else {
        this.direction = "ASC"
      }
    }
    this.orderBy = sort;
    this.attributes = [];
    this.showAttributes(this.table, this.page, this.linesPerPage, this.orderBy, this.direction);
  }

  new() {

    this.router.navigate([(`/tables/${this.id}/newAttribute`)]);

  }


  selectLines(event: any) {
    this.linesPerPage = event.target.value;
    this.attributes = [];
    this.showAttributes(this.table, this.page, this.linesPerPage, this.orderBy, this.direction);
  }

  selectPage(page: number) {
    this.page = page;

    this.attributes = [];
    this.showAttributes(this.table, this.page, this.linesPerPage, this.orderBy, this.direction);
  }


  previousPage() {
    this.page = this.page - 1;
    this.attributes = [];
    this.showAttributes(this.table, this.page, this.linesPerPage, this.orderBy, this.direction);
  }

  nextPage() {
    this.page = this.page + 1;
    this.attributes = [];
    this.showAttributes(this.table, this.page, this.linesPerPage, this.orderBy, this.direction);
  }

  onSearchChange(searchValue: string) {
    this.attributes = [];
    this.showAttributes(this.table, this.page, this.linesPerPage, this.orderBy, this.direction);

  }



  deleteSelected() {
    let i = (this.page * this.linesPerPage) - 1;
    let length = 0;

    if (this.attributes.length > this.linesPerPage) {
      length = this.linesPerPage;
    } else {
      length = this.attributes.length;

    }

    while (i < length) {
      if (this.srows[i] == true) {
        this.tableService.find(this.id)

        this.attributeService.delete(this.attributes[i])
          .subscribe(response => {
            this.attributes = [];
            this.showAttributes(this.table, this.page, this.linesPerPage, this.orderBy, this.direction);
            this.toastr.success('attribute deleted!', 'Success!');
            this.closeDeleteModal.nativeElement.click();

          },
            error => { this.toastr.error(this.message.getter()); });

      }
      this.srows.push(false);

      i++;
    }
  }
  select(attribute: AttributeDTO) {
    this.sAttribute = attribute ;
  }

  update(){
    let i = (this.page * this.linesPerPage) - 1;
    let length = 0;

    if (this.attributes.length > this.linesPerPage) {
      length = this.linesPerPage;
    } else {
      length = this.attributes.length;

    }

    while (i < length) {
      if (this.srows[i] == true) {
    
        this.eAttributes.push(this.attributes[i].id);
      }
      this.srows.push(false);

      i++;
    }

    console.log(this.eAttributes.length)
    
    let j = 0
    while(j < this.eAttributes.length){
      if(j == (this.eAttributes.length -1)){
        this.list += this.eAttributes[j];
      }else{
        this.list += this.eAttributes[j] + "-";
      }
      j++;
    }
  
    this.closeUpdateModal.nativeElement.click();
  
    this.router.navigate([(`/tables/${this.table.id}/updateAttribute/${this.list}`)]);

  }

  delete() {
    this.attributeService.delete(this.sAttribute)
      .subscribe(response => {
        this.attributes = [];
        this.showAttributes(this.table, this.page, this.linesPerPage, this.orderBy, this.direction);
        this.toastr.success('attribute deleted!', 'Success!');
        this.closeDeleteModal.nativeElement.click();

      },
        error => { this.toastr.error(this.message.getter()); });
  }
}
