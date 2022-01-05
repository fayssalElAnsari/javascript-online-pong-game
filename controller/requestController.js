import { URL } from 'url';

export default class RequestController {
  static BASE = 'http://localhost/';

  #request;
  #response;
  #url;

  constructor(request, response) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(request.url, `http://${request.headers.host}`);

  }

  get response() {
    return this.#response;
  }

  handleRequest() {
    const url = new URL(this.#request = req);
    this.prepareResponse();
    this.buildResponse();
  }

  prepareResponse() {
    this.response.statusCode = 200;
    this.response.setHeader( 'Content-Type' , 'text/html');
  }

  buildResponse()  {
    const nameValue = this.#url.searchParams.get('name') || 'unknown';
    // the classes will edit the response
    // there will be 2 types of classes

    this.response.write('<h1>TP1</h1>');

    // routage "à la main"
    if (this.#url.pathname == '/') {
        this.response.write(`<h2>welcome home</h2>`);
    }
    else if (this.#url.pathname.startsWith('/first') ){

    }
      
    else if (this.#url.pathname.startsWith('/second') )
      this.response.write(`<p>Welcome to <strong>the second page</strong></p>`);
    else if (this.#url.pathname.startsWith('/json') )
      this.response.write(`<p>Welcome to <strong>${nameValue}</strong></p>`);
    else  {
      this.response.write(`<p>404 : page <strong>${this.#url}</strong> not found</p>`);
    }
    this.response.end();
  
  }

}