import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { UserDTO } from "../../models/user-dto";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
    private user: UserDTO;
    constructor(
    public http: HttpClient){
    }

    findAll() : Observable<UserDTO[]>{
        return this.http.get<UserDTO[]>(`${API_CONFIG.baseUrl}/users`);
    }
    findByEmail(email: string): Observable<UserDTO>{
        return this.http.get<UserDTO>(`${API_CONFIG.baseUrl}/users/email?value=${email}`);
    }
    

  
    setter(user:UserDTO){
        this.user = user;
    }

    getter(){
        return this.user;
    }
}