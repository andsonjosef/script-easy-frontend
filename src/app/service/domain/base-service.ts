import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { BaseDTO } from "../../models/bases.dto.";

@Injectable()
export class BaseService{

    constructor(public http: HttpClient){
    }

    findBases() : Observable<BaseDTO[]>{
        return this.http.get<BaseDTO[]>(`${API_CONFIG.baseUrl}/bases`);
    }
}