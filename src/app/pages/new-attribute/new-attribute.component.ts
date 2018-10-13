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
  names: string[] = [];
  ais: boolean[] = [];
  defaultAs: string[] = [];
  indexs: string[] = [];
  nullAs: boolean[] = [];
  sizes: string[] = [];
  types: string[] = [];
  comments: string[] = [];
  referencesTables: string[] = [];
  countries = ['USA', 'Canada', 'Uk'];
  attributes: AttributeDTO[] = [];
  rows: number[] = [];
  id: number;
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
    this.rows = [0,1,2];
  }



  new() {
    let i;
    i = 0;

    while (i < this.names.length) {
      if (this.ais[i] != true) {
        this.ais[i] = false;
      }
      if (this.nullAs[i] != true) {
        this.nullAs[i] = false;
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
