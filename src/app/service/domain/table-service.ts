import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs";
import { SchemaDTO } from "../../models/schemas.dto";
import { TableDTO } from "../../models/tables.dto";


@Injectable()
export class TableService{
    private table: TableDTO;
    constructor(public http: HttpClient){
    }

    findTables(schema_id : string): Observable<TableDTO[]>{
        
        return this.http.get<TableDTO[]>(`${API_CONFIG.baseUrl}/schemas/${schema_id}/tables`);
    }

    setter(Table:TableDTO){
        this.table = Table;
    }

    getter(){
        return this.table;
    }

    findPage(schema: SchemaDTO, page : number, linesPerPage : number, orderBy: string, direction: string ){
        return this.http.get(`${API_CONFIG.baseUrl}/schemas/${schema.id}/tables/page?page=${page}&linesPerPage=${linesPerPage}&orderBy=${orderBy}&direction=${direction}`);
    }

    insert(obj : TableDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/tables`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(obj : TableDTO) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/tables/${obj.id}`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
    delete(obj : TableDTO) {
        return this.http.delete(
            `${API_CONFIG.baseUrl}/tables/${obj.id}`, 
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}