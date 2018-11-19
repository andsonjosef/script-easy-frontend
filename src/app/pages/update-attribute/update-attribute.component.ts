import { Component, OnInit, Input, Attribute, ViewContainerRef } from '@angular/core';
import { AttributeService } from 'src/app/service/domain/attribute-service';
import { AttributeDTO } from 'src/app/models/attributes.dto';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { MessageService } from 'src/app/service/domain/message.service';
import { TableService } from 'src/app/service/domain/table-service';

@Component({
  selector: 'app-updateAttribute',
  templateUrl: './update-attribute.component.html',
  styleUrls: ['./update-attribute.component.css']
})
export class UpdateAttributeComponent implements OnInit {

  lindexs = ["", "PRIMARY", "FOREIGN", "UNIQUE"];
  dtypes = ["INT", "VARCHAR", "BOOLEAN", "DATE", "TEXT"];
  ntypes = ["TINYINT", "SMALLINT", "MEDIUMINT", "INT", "BIGINT", "DECIMAL", "FLOAT", "DOUBLE", "REAL", "BIT", "BOOLEAN", "SERIAL", "NUMERIC", "RAW"];
  ttypes = ["DATE", "DATETIME", "TIMESTAMP", "TIME", "YEAR"];
  stypes = ["CHAR", "VARCHAR", "TINYTEXT", "TEXT", "MEDIUMTEXT", "LONGTEXT", "BINARY", "VARBINARY", "TINYBLOB", "MEDIUMBLOB", "BLOB", "LONGBLOB", "ENUM", "SET", "CLOB"];
  names: string[] = [];
  id: number;
  idsA: string[] = [];
  ais: boolean[] = [];
  defaultAs: string[] = [];
  indexs: string[] = [];
  nullAs: boolean[] = [];
  sizes: number[] = [];
  types: string[] = [];
  comments: string[] = [];
  referencesTables: string[] = [];
  attribute: AttributeDTO;
  attributes: AttributeDTO[] = [];
  constructor(
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public message: MessageService,
    private router: Router,
    public attributeService: AttributeService,
    public tableService: TableService) { }

  ngOnInit() {
    let ids = this.router.url.substring(this.router.url.indexOf("/updateAttribute/") + 17);
    let toArray =  ids.split("-");
    let i = 0;
    while(i < toArray.length){
      this.attributeService.find(parseInt(toArray[i]))
      .subscribe(response => {
        this.attribute = response;
        this.attributes.push(this.attribute)
        this.names.push(this.attribute.name)
        this.ais.push(this.attribute.ai)
        this.defaultAs.push(this.attribute.defaultA)
        this.indexs.push(this.attribute.indexA)
        this.sizes.push(this.attribute.size)
        this.types.push(this.attribute.type)
        this.referencesTables.push(this.attribute.referencesTable)
        this.comments.push(this.attribute.comment)
        this.nullAs.push(this.attribute.nullA)
        this.idsA.push(this.attribute.id)
      },error => { this.toastr.error(this.message.getter()); });
      i ++;
    }
   
  }

  update(){
    let i = 0;

    while (i < this.attributes.length) {
      if (this.ais[i] != true) {
        this.ais[i] = false;
      }
      if (this.nullAs[i] != true) {
        this.nullAs[i] = false;
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
      this.attribute.id = this.idsA[i];
      this.id = parseInt(this.router.url.substring(this.router.url.indexOf("/tables/") + 8, this.router.url.indexOf("/updateAttribute")));
      this.tableService.find(this.id)
        .subscribe(response => {
          this.attribute.table = response;
        },
          error => { this.toastr.error(this.message.getter()); });

     console.log(this.attribute)

      this.attributeService.update(this.attribute)
        .subscribe(response => {

          this.toastr.success('Table created!', 'Success!');
        },
          error => { this.toastr.error(this.message.getter()); });

      i++;
    }
  }

}
