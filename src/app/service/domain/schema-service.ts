import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs";
import { SchemaDTO } from "../../models/schemas.dto";


@Injectable()
export class SchemaService{

    constructor(public http: HttpClient){
    }

    findSchemas(base_id : string): Observable<SchemaDTO[]>{
        
        return this.http.get<SchemaDTO[]>(`${API_CONFIG.baseUrl}/bases/${base_id}/schemas`);
    }
}