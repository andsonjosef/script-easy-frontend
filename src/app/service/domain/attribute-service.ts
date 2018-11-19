import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs";
import { TableDTO } from "../../models/tables.dto";
import { AttributeDTO } from "src/app/models/attributes.dto";


@Injectable()
export class AttributeService{
    private attribute: AttributeDTO;
    private attributes: AttributeDTO[];
    
    emmiter = new EventEmitter<AttributeDTO[]>();
    constructor(public http: HttpClient){
    }

    findAttributes(table_id : string): Observable<AttributeDTO[]>{
        
        return this.http.get<AttributeDTO[]>(`${API_CONFIG.baseUrl}/tables/${table_id}/attributes`);
    }

    setter(attribute:AttributeDTO){
        this.attribute = attribute;
    }

    getter(){
        return this.attribute;
    }

    setterList(attributes:AttributeDTO[]){
        this.attributes = attributes;
    }

    getterList(){
        return this.attributes;
    }
    hasPk(table_id : number): Observable<boolean>{
        return this.http.get<boolean>(`${API_CONFIG.baseUrl}/tables/${table_id}/attributes/pk`);
    }

    findPage(table: TableDTO, page : number, linesPerPage : number, orderBy: string, direction: string ){
        return this.http.get(`${API_CONFIG.baseUrl}/tables/${table.id}/attributes/page?page=${page}&linesPerPage=${linesPerPage}&orderBy=${orderBy}&direction=${direction}`);
    }

    findReferences(schema_id: number ): Observable<TableDTO[]>{
        return this.http.get<TableDTO[]>(`${API_CONFIG.baseUrl}/attributes/ref/${schema_id}`);
    }

    insert(obj : AttributeDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/attributes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(obj : AttributeDTO) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/attributes/${obj.id}`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
    delete(obj : AttributeDTO) {
        return this.http.delete(
            `${API_CONFIG.baseUrl}/attributes/${obj.id}`, 
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    updateList(obj: AttributeDTO[]){
        this.emmiter.emit(obj);
    }

    find(id: number){
        return this.http.get<AttributeDTO>(`${API_CONFIG.baseUrl}/attributes/${id}`);

    }

    
}