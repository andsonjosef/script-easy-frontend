import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { BaseDTO } from "../../models/bases.dto";

@Injectable()
export class BaseService{
    private base: BaseDTO;
    constructor(public http: HttpClient){
    }

    findBases() : Observable<BaseDTO[]>{
        return this.http.get<BaseDTO[]>(`${API_CONFIG.baseUrl}/bases`);
    }

    setter(base:BaseDTO){
        this.base = base;
    }

    getter(){
        return this.base;
    }

    findPage(page : number, linesPerPage : number, orderBy: string, direction: string ){
        return this.http.get(`${API_CONFIG.baseUrl}/bases/page?page=${page}&linesPerPage=${linesPerPage}&orderBy=${orderBy}&direction=${direction}`);
    }

    insert(obj : BaseDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/bases`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(obj : BaseDTO) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/bases/${obj.id}`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
    delete(obj : BaseDTO) {
        return this.http.delete(
            `${API_CONFIG.baseUrl}/bases/${obj.id}`, 
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}