import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AttributeDTO } from 'src/app/models/attributes.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { TableService } from 'src/app/service/domain/table-service';
import { AttributeService } from 'src/app/service/domain/attribute-service';
import { ToastsManager } from 'ng6-toastr';
import { MessageService } from 'src/app/service/domain/message.service';
import { TableDTO } from 'src/app/models/tables.dto';

@Component({
  selector: 'app-new-attribute',
  templateUrl: './new-attribute.component.html',
  styleUrls: ['./new-attribute.component.css']
})
export class NewAttributeComponent implements OnInit {
  attribute: AttributeDTO = {
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

  schemaId: number;
  hasPk;
  selectPk;
  table: TableDTO;
  tables: TableDTO[] = [];
  lindexs = ["", "PRIMARY", "FOREIGN", "UNIQUE"];
  dtypes = ["INT", "VARCHAR", "BOOLEAN", "DATE", "TEXT"];
  ntypes = ["TINYINT", "SMALLINT", "MEDIUMINT", "INT", "BIGINT", "DECIMAL", "FLOAT", "DOUBLE", "REAL", "BIT", "BOOLEAN", "SERIAL", "NUMERIC", "RAW"];
  ttypes = ["DATE", "DATETIME", "TIMESTAMP", "TIME", "YEAR"];
  stypes = ["CHAR", "VARCHAR", "TINYTEXT", "TEXT", "MEDIUMTEXT", "LONGTEXT", "BINARY", "VARBINARY", "TINYBLOB", "MEDIUMBLOB", "BLOB", "LONGBLOB", "ENUM", "SET", "CLOB"];
  names: string[] = [];
  ais: boolean[] = [];
  defaultAs: string[] = [];
  indexs: string[] = [];
  nullAs: boolean[] = [];
  sizes: number[] = [];
  types: string[] = [];
  comments: string[] = [];
  referencesTables: string[] = [];
  attributes: AttributeDTO[] = [];
  srows: boolean[] = [];
  rows: boolean[] = [];
  id: number;
  add: number = 1;
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
    this.rows = [false, false, false, false];
    this.id = parseInt(this.router.url.substring(this.router.url.indexOf("/tables/") + 8, this.router.url.indexOf("/newAttribute")));
    this.attributeService.hasPk(this.id)
      .subscribe(response => {
        this.hasPk = response;

      },
        error => { this.toastr.error(this.message.getter()); });

      this.tableService.find(this.id)
      .subscribe(response => {
        this.table = response;
        this.attributeService.findReferences(parseInt(this.table.schema.id))
        .subscribe(response => {
          this.tables = response;

  
        },
          error => { this.toastr.error(this.message.getter()); });
      },
        error => { this.toastr.error(this.message.getter()); });

      

  }

  addRow(add: number) {
    let i = 0;


    while (i < add) {
      this.rows.push(false);


      i++;
    }
  }

  removeRow() {

    let i = 0;
    while (i < this.srows.length) {
      if (this.srows[i] == true) {
        this.names.splice(i, 1);
        this.ais.splice(i, 1);
        this.defaultAs.splice(i, 1);
        this.indexs.splice(i, 1);
        this.nullAs.splice(i, 1);
        this.sizes.splice(i, 1);
        this.types.splice(i, 1);
        this.comments.splice(i, 1);
        this.referencesTables.splice(i, 1);
        this.srows.splice(i, 1);
        this.rows.splice(i, 1);
      }

      i++;
    }
  }


  change() {
    let i = 0;
   let count = 0;
    while (i < this.rows.length) {
      if (this.indexs[i] == "PRIMARY") {
       count ++;
      }
      if (count == 0) {
        this.selectPk = false;
      }else{
        this.selectPk = true
      }
      i++;
    }
  }
  new() {
    let i = 0;

    while (i < this.rows.length) {
      if (this.ais[i] != true) {
        this.ais[i] = false;
      }
      if (this.nullAs[i] != true) {
        this.nullAs[i] = false;
      }

      if (this.names[i] == null || this.names[i] == "") {
        this.names.splice(i, 1);
        this.ais.splice(i, 1);
        this.defaultAs.splice(i, 1);
        this.indexs.splice(i, 1);
        this.nullAs.splice(i, 1);
        this.sizes.splice(i, 1);
        this.types.splice(i, 1);
        this.comments.splice(i, 1);
        this.referencesTables.splice(i, 1);
        this.srows.splice(i, 1);
        this.rows.splice(i, 1);

      }
      this.attribute.name = this.names[i];

      this.attribute.ai = this.ais[i];
      this.attribute.defaultA = this.defaultAs[i];
      this.attribute.indexA = this.indexs[i];
      this.attribute.size = this.sizes[i];
      this.attribute.type = this.types[i];
      this.attribute.referencesTable = this.referencesTables[i];
      this.attribute.comment = this.comments[i];
      this.attribute.nullA = this.nullAs[i];
      this.attributes[i] = this.attribute;
      this.id = parseInt(this.router.url.substring(this.router.url.indexOf("/tables/") + 8, this.router.url.indexOf("/newAttribute")));
      this.tableService.find(this.id)
        .subscribe(response => {
          this.attribute.table = response;

        },
          error => { this.toastr.error(this.message.getter()); });


      this.attributeService.insert(this.attribute)
        .subscribe(response => {

          this.toastr.success('Table created!', 'Success!');
        },
          error => { this.toastr.error(this.message.getter()); });

      i++;
    }
  }
}
