const AWS = require('aws-sdk');
const elasticsearch = require('elasticsearch');
require('dotenv').config();
const states = require('../resources/states.json');
const quotes = require('../resources/quotes.json');

let region = process.env.AWS_REGION;
let domain = process.env.AWS_ELASTIC_DOMAIN;
let json = {
    "QuoteId": 5,
    "MinPrice": 155,
    "Direct": false,
    "Carrier": "jetBlue",
    "OriginCity": "New York",
    "OriginState": "NY",
    "DestinationCity": "Chicago",
    "DestinationState": "IL"
};

let json2 = {
    "name": "Falafel cafe",
    "rating": 5,
    "price": "$",
    "location": {
      "address1": "401 19th St S",
      "address2": "Ste 100",
      "city": "Birmingham",
      "zip_code": "35233",
      "country": "US",
      "state": "AL"
    },
    "phone": "+12058683999"
};

// indexFlightQuote(json);
// for (const state of states) {
//     indexState(state);
// }

function indexState(doc) {
    let endpoint = new AWS.Endpoint(domain);
    let request = new AWS.HttpRequest(endpoint, region);

    let index = 'states';
    let type = '_doc';
    let id = doc.id;

    request.method = 'PUT';
    request.path += index + '/' + type + '/' + id;
    request.body = JSON.stringify(doc);
    request.headers['host'] = domain;
    request.headers['Content-Type'] = 'application/json';
    // Content-Length is only needed for DELETE requests that include a request
    // body, but including it for all requests doesn't seem to hurt anything.
    request.headers['Content-Length'] = Buffer.byteLength(request.body);

    let credentials = new AWS.EnvironmentCredentials('AWS');
    credentials.accessKeyId = process.env.AWS_KEY_ID;
    credentials.secretAccessKey = process.env.AWS_SECRET;

    let signer = new AWS.Signers.V4(request, 'es');
    signer.addAuthorization(credentials, new Date());

    let client = new AWS.HttpClient();
    client.handleRequest(request, null, function(response) {
        console.log(response.statusCode + ' ' + response.statusMessage);
        let responseBody = '';
        response.on('data', function (chunk) {
            responseBody += chunk;
        });
        response.on('end', function (_) {
            console.log('Response body: ' + responseBody);
        });
        }, function(error) {
        console.log('Error: ' + error);
    });
}


deleteIndex('flight-quotes');

for (const quote of quotes) {
    indexFlightQuote(quote);
}

function deleteIndex(index) {
    let endpoint = new AWS.Endpoint(domain);
    let request = new AWS.HttpRequest(endpoint, region);

    request.method = 'DELETE';
    request.path += index;
    request.headers['host'] = domain;


    let credentials = new AWS.EnvironmentCredentials('AWS');
    credentials.accessKeyId = process.env.AWS_KEY_ID;
    credentials.secretAccessKey = process.env.AWS_SECRET;

    let signer = new AWS.Signers.V4(request, 'es');
    signer.addAuthorization(credentials, new Date());

    let client = new AWS.HttpClient();
    client.handleRequest(request, null, function(response) {
        let responseBody = '';
        response.on('data', function (chunk) {
            responseBody += chunk;
        });
        response.on('end', function (chunk) {
            console.log('Response body: ' + responseBody);
        });
        }, function(error) {
        console.log('Error: ' + error);
    });
}

function indexFlightQuote(quote) {
    let endpoint = new AWS.Endpoint(domain);
    let request = new AWS.HttpRequest(endpoint, region);

    let index = 'flight-quotes';
    let type = '_doc';
    let id = quote['QuoteId'];

    request.method = 'PUT';
    request.path += index + '/' + type + '/' + id;
    request.body = JSON.stringify(quote);
    request.headers['host'] = domain;
    request.headers['Content-Type'] = 'application/json';
    // Content-Length is only needed for DELETE requests that include a request
    // body, but including it for all requests doesn't seem to hurt anything.
    request.headers['Content-Length'] = Buffer.byteLength(request.body);

    let credentials = new AWS.EnvironmentCredentials('AWS');
    credentials.accessKeyId = process.env.AWS_KEY_ID;
    credentials.secretAccessKey = process.env.AWS_SECRET;

    let signer = new AWS.Signers.V4(request, 'es');
    signer.addAuthorization(credentials, new Date());

    let client = new AWS.HttpClient();
    client.handleRequest(request, null, function(response) {
        console.log(response.statusCode + ' ' + response.statusMessage);
        let responseBody = '';
        response.on('data', function (chunk) {
            responseBody += chunk;
        });
        response.on('end', function (chunk) {
            console.log('Response body: ' + responseBody);
        });
        }, function(error) {
        console.log('Error: ' + error);
    });
}

// indexYelpPlaces(json2);

function indexYelpPlaces(place) {
    let endpoint = new AWS.Endpoint(domain);
    let request = new AWS.HttpRequest(endpoint, region);
    let index = 'yelp-places';
    let type = '_doc';
    let id = place['id'];

    console.log(place)

    request.method = 'PUT';
    request.path += index + '/' + type + '/' + id;
    request.body = JSON.stringify(place);
    request.headers['host'] = domain;
    request.headers['Content-Type'] = 'application/json';
    // Content-Length is only needed for DELETE requests that include a request
    // body, but including it for all requests doesn't seem to hurt anything.
    request.headers['Content-Length'] = Buffer.byteLength(request.body);
    
    let credentials = new AWS.EnvironmentCredentials('AWS');
    credentials.accessKeyId = process.env.AWS_KEY_ID;
    credentials.secretAccessKey = process.env.AWS_SECRET;

    let signer = new AWS.Signers.V4(request, 'es');
    signer.addAuthorization(credentials, new Date());

    let client = new AWS.HttpClient();
    client.handleRequest(request, null, function(response) {
        console.log(response.statusCode + ' ' + response.statusMessage);
        let responseBody = '';
        response.on('data', function (chunk) {
            responseBody += chunk;
        });
        response.on('end', function (chunk) {
            console.log('Response body: ' + responseBody);
        });
        }, function(error) {
        console.log('Error: ' + error);
    });
}

module.exports = { indexFlightQuote, indexYelpPlaces };
