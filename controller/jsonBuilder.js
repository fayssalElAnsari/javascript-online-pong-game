import { URL } from 'url';
import ResponseBuilder from './responseBuilder';

export default class JsonBuilder extends ResponseBuilder{ 

    prepareResponse() {
        this.response.statusCode = 200;
        this.response.setHeader( 'Content-Type' , 'text/html');
    }


}