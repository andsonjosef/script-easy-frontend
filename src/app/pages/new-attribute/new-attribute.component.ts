import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AttributeDTO } from 'src/app/models/attributes.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { TableService } from 'src/app/service/domain/table-service';
import { AttributeService } from 'src/app/service/domain/attribute-service';
import { ToastsManager } from 'ng6-toastr';
import { MessageService } from 'src/app/service/domain/message.service';

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
    index: "",
    name: "",
    nullA: false,
    size: "",
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
  names: string[] = [];
  ais: boolean[] = [];
  defaultAs: string[] = [];
  indexs: string[] = [];
  nullAs: boolean[] = [];
  sizes: string[] = [];
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
    console.log("lenght" + this.srows.length);
    while (i < this.srows.length) {
      console.log("ture? " + this.srows[i] + " i " + i);
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
        console.log("lenght after" + this.srows.length);
      }

      i++;
    }
  }

  test(){
    let i = 0;
    while(i < this.attributes.length){
      this.attribute = this.attributes[i];
      this.id = parseInt(this.router.url.substring(this.router.url.indexOf("/tables/") + 8, this.router.url.indexOf("/newAttribute")));
      this.tableService.find(this.id)
        .subscribe(response => {
          this.attribute.table = response;

        },
          error => { this.toastr.error(this.message.getter()); });


      this.attributeService.insert(this.attribute)
        .subscribe(response => {

          this.toastr.success('Attribute created!', 'Success!');
        },
          error => { this.toastr.error(this.message.getter()); });

      console.log(this.attribute);
      i++;
    }
  }

  new() {
    let i;
    i = 0;

    while (i < this.rows.length) {
      if (this.ais[i] != true) {
        this.ais[i] = false;
      }
      if (this.nullAs[i] != true) {
        this.nullAs[i] = false;
      }

      if(this.names[i] == null || this.names[i] == ""){
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
      this.attribute.index = this.indexs[i];
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

      console.log(this.attribute);
      i++;
    }
  }
}
