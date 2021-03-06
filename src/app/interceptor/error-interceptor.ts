import { Injectable, ViewContainerRef } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../service/storage.service";
import { FieldMessage } from "../service/domain/fieldmessage";
import { ToastsManager } from "ng6-toastr";
import { MessageService } from "../service/domain/message.service";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService,public message: MessageService
      ) {
       
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error) => {
            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }


            switch(errorObj.status){
                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                case 422:
                this.handle422(errorObj);
                break;

                default:
                this.handleDefaultError(errorObj);
                
            }

            return Observable.throw(errorObj);
        }) as any;
    } 

    handleDefaultError(errorObj){
        
    this.message.setter('error!' + errorObj.status + ': ' + errorObj.error + " " + errorObj.message);

    }

    handle401(){
      
        this.message.setter('Error 401: Authentication failed! invalid email or password');
      
    }

    handle403(){
        this.storage.setLocalUser(null);
    }

    handle422(errorObj) {
        this.message.setter('Error 422: Validation!' + this.listErrors(errorObj.errors));
      
    }

    private listErrors(messages : FieldMessage[]) : string {
        let s : string = '';
        for (var i=0; i<messages.length; i++) {
            s = s +  messages[i].fieldName + " " + messages[i].message ;
        }
        return s;
        
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};