import { Component, OnInit, ViewEncapsulation, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDTO } from '../../models/bases.dto';
import { BaseService } from '../../service/domain/base-service';
import { UserService } from '../../service/domain/user-service';
import { StorageService } from '../../service/storage.service';
import { UserDTO } from '../../models/user-dto';
import { ToastsManager } from 'ng6-toastr';
import { MessageService } from '../../service/domain/message.service';

@Component({
    selector: 'app-bases',
    templateUrl: './bases.component.html',
    styleUrls: ['./bases.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class BasesComponent implements OnInit {


    user: UserDTO;
    sBase: BaseDTO = {
        name: "",
        id: "",
    };
    nBase: BaseDTO = {
        name: "",
        id: "",
    };
    email: string;
    bases: BaseDTO[] = [];
    pages: number[];
    linesValue: number[] = [1, 2, 3, 4];
    page: number = 0;
    linesPerPage: number = 24;
    orderBy: string = 'name';
    direction: string = 'ASC';
    numberOfPages: number = 0;
    total: number;
    @ViewChild('closeNewModal') closeNewModal: ElementRef;
    @ViewChild('closeUpdateModal') closeUpdateModal: ElementRef;
    @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef;
    constructor(
        public baseService: BaseService,
        public storageService: StorageService,
        public userService: UserService,
        private router: Router,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        public message: MessageService) {
        this.toastr.setRootViewContainerRef(vcr);
    }


    ngOnInit() {
        this.showBases(this.page, this.linesPerPage, this.orderBy, this.direction);
    }


    showSchemas(base: BaseDTO) {
        this.baseService.setter(base)
        this.router.navigate([(`/bases/${base.id}/schemas/page`)]);

    }

    select(base: BaseDTO) {
        this.sBase = base;
        console.log("selected " + this.sBase);
    }

    showBases(page: number, linesPerPage: number, orderBy: string, direction: string) {
        this.baseService.findPage(page, linesPerPage, orderBy, direction)
            .subscribe(response => {
                this.bases = this.bases.concat(response['content']);
                this.numberOfPages = response['totalPages'];
                this.pages = [];
                this.total = this.bases.length

                for (var i = 0; i < this.numberOfPages; i++) {
                    this.pages.push(i);
                    console.log(this.pages)
                }

            },
                error => { this.toastr.error(this.message.getter()); });
    }

    selectLines(event: any) {
        this.linesPerPage = event.target.value;
        this.bases = [];
        this.showBases(this.page, this.linesPerPage, this.orderBy, this.direction);

    }

    selectPage(page: number) {
        this.page = page;

        this.bases = [];
        this.showBases(this.page, this.linesPerPage, this.orderBy, this.direction);

    }

    nextPage() {
        this.page = this.page + 1;
        this.bases = [];
        this.showBases(this.page, this.linesPerPage, this.orderBy, this.direction);
    }

    insert() {
        
        console.log(this.nBase.name);
        this.baseService.insert(this.nBase)
            .subscribe(response => {
                this.bases = [];
                this.showBases(this.page, this.linesPerPage, this.orderBy, this.direction);
                this.toastr.success('Base created!', 'Success!');
                this.closeNewModal.nativeElement.click();
            },
                error => { this.toastr.error(this.message.getter()); });

    }

    update() {

        this.baseService.update(this.sBase)
            .subscribe(response => {
                this.bases = [];
                this.showBases(this.page, this.linesPerPage, this.orderBy, this.direction);
                this.toastr.success('Base updated!', 'Success!');
                document.getElementById('newModal').click();
                this.closeUpdateModal.nativeElement.click();

            },
                error => { this.toastr.error(this.message.getter()); });

    }

    delete() {

        this.baseService.delete(this.sBase)
            .subscribe(response => {
                this.bases = [];
                this.showBases(this.page, this.linesPerPage, this.orderBy, this.direction);
                this.toastr.success('Base deleted!', 'Success!');
                this.closeDeleteModal.nativeElement.click();

            },
                error => { this.toastr.error(this.message.getter()); });

    }


    previousPage() {
        this.page = this.page - 1;
        this.bases = [];
        this.showBases(this.page, this.linesPerPage, this.orderBy, this.direction);
    }
}


