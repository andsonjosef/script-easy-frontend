import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs";
import { SchemaDTO } from "../../models/schemas.dto";
import { BaseDTO } from "../../models/bases.dto";


@Injectable()
export class SchemaService{
    private schema: SchemaDTO;
    constructor(public http: HttpClient){
    }

    findSchemas(base_id : string): Observable<SchemaDTO[]>{
        
        return this.http.get<SchemaDTO[]>(`${API_CONFIG.baseUrl}/bases/${base_id}/schemas`);
    }

    setter(Schema:SchemaDTO){
        this.schema = Schema;
    }

    getter(){
        return this.schema;
    }

    find(id: number){
        return this.http.get<SchemaDTO>(`${API_CONFIG.baseUrl}/schemas/${id}`);

    }

    findPage(base: BaseDTO, page : number, linesPerPage : number, orderBy: string, direction: string ){
        console.log("id aaa", base.id);
        return this.http.get(`${API_CONFIG.baseUrl}/bases/${base.id}/schemas/page?page=${page}&linesPerPage=${linesPerPage}&orderBy=${orderBy}&direction=${direction}`);
    }

    insert(obj : SchemaDTO) {
        console.log("sadasd " + obj.name + " "  + obj.base.id)
        return this.http.post(
            `${API_CONFIG.baseUrl}/schemas`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(obj : SchemaDTO) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/schemas/${obj.id}`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
    delete(obj : SchemaDTO) {
        return this.http.delete(
            `${API_CONFIG.baseUrl}/schemas/${obj.id}`, 
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}