import ResponseBuilder from './responseBuilder.js';

export default class JsonBuilder extends ResponseBuilder{ 

    buildHeader(){
        super.status = 200;
        super.contentType = 'application/json; charset=utf-8';
        super.buildHeader();
    }

    buildBody(){
        const params = super.url.searchParams;
        let jsonObj = {};
        params.forEach((value, key) => {
            jsonObj[key] = value;
        });
        jsonObj['date'] = `${new Date()}`;
        super.write(JSON.stringify(jsonObj));
    }

}

