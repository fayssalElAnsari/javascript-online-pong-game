import ResponseBuilder from "./responseBuilder.js";
import fs from 'fs';

export default class BrutFileBuilder extends ResponseBuilder{

    buildHeader(){
        super.status = 200;
        super.contentType = 'text/plain';
    }

    buildBody(){
        var path;
        path = "." + super.url.pathname;
        console.log(path);
        fs.readFileSync(path);
        console.log(fs);
        super.write(fs);
        
    }


}