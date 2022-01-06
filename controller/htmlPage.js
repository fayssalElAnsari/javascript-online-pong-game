import ResponseBuilder from "./responseBuilder.js";


export default class HtmlPage extends ResponseBuilder {

    buildHeader(){
        super.contentType = 'text/html; charset=utf-8';
        super.buildHeader();
    }

    buildFooter(){
        super.response.write(`<footer>${new Date()}</footer></body></html>`)
    }

}