import HtmlPage from './htmlPage.js';

export default class ErrorPage extends HtmlPage {

    buildHeader(){
        super.status = 404;
        super.contentType = 'text/html; charset=utf-8';
        super.buildHeader();
    }

    buildBody(){
        this.write("error 404: page not found!");
    }

}