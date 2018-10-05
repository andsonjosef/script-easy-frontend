
export class MessageService{
    private message: string;
    constructor(){
    }

    
    setter(message:string){
        this.message = message;
    }

    getter(){
        return this.message;
    }
}
    