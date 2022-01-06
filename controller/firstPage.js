import HtmlPage from './htmlPage.js';

export default class FirstPage extends HtmlPage {

    buildHeader(){
        super.status = 200;
        super.buildHeader();
    }
    
    buildBody(){
        super.buildBody(); 
        this.write(`<img src="./public/img/timoleon_oceanie.jpg" alt="timoleon bien sur">`);
        this.write("this is the <strong> first </strong> page");
    }

}