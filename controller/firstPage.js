import HtmlPage from './htmlPage.js';

export default class FirstPage extends HtmlPage {

    buildHeader(){
        super.status = 200;
        super.buildHeader();
    }
    
    buildBody(){
        super.buildBody(); 
        this.write("this is the <strong> first </strong> page");
    }

}