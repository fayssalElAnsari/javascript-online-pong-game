
export default class ResponseBuilder {

    #request;
    #response;
    #url;
    #contentType;
    #status;

    constructor(request, response, url) {
        this.#request = request;
        this.#response = response;
        this.#url = url;
    }

    buildResponse(){
        this.buildHeader();
        this.buildBody();
        this.buildFooter();
    }

    buildHeader(){
        this.#response.statusCode = this.#status;
        this.#response.setHeader("Content-Type", this.#contentType);
    }

    buildBody(){
        this.write("<html><head></head><body>");
    }

    buildFooter(){
        
    }

    write(string){
        this.#response.write(string);
    }

    get request(){
        return this.#request;
    }

    get response(){
        return this.#response;
    }

    set response(res){
        this.#response = res;
    }

    get url(){
        return this.#url;
    }

    get status(){
        return this.#status;
    }

    set status(st){
        this.#status = st;
    }

    get contentType(){
        return this.#contentType;
    }

    set contentType(ct){
        this.#contentType = ct;
    }
}

