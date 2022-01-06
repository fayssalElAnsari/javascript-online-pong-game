import ResponseBuilder from "./responseBuilder.js";


export default class HtmlPage extends ResponseBuilder {

    buildHeader(){
        super.contentType = 'text/html; charset=utf-8';
        super.buildHeader();
        this.write(`<link href="./public/style/style.css" rel="stylesheet" type="text/css">`);
    }

    buildFooter(){
        super.response.write(`<footer class="ok">${new Date()}</footer></body></html>`)
    }

}