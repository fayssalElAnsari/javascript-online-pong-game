import { URL } from 'url';

export default class ResponseBuilder {

    #request;
    #response;
    #url;
    #contentType;

    constructor(request, response, status=200, contentType) {
        this.#request = request;
        this.response = response;
        this.#contentType = contentType;
    }

    buildResponse(){
        this.buildHeader();
        this.buildBody();
        this.buildFooter();
    }

    buildHeader(){
        this.#response.statusCode = this.#status;
        this.#response.setHeader("Content-type", this.#contentType)
    }

    buildBody(){

    }

    buildFooter(){

    }

    write(string){
        this.#response.write(string);
    }

}