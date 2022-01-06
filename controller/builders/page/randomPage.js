import JsonBuilder from "../jsonBuilder.js";

export default class RandomPage extends JsonBuilder {

    buildBody(){
        let some_int = Math.round(Math.random() * 100);
        let jsonObj = {};
        jsonObj['randomValue'] = some_int;
        super.write(JSON.stringify(jsonObj));
    }

}