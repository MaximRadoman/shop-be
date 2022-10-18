const products = require('./resources/products.json');
const stocks = require('./resources/stock.json');

let AWS = require('aws-sdk');

const dbProducts = products.map(({ id, title, description, price }) => ({
    PutRequest: {
        Item: {
            id: { S: id },
            title: { S: title },
            description: { S: description },
            price: { N: price }
        }
    }
}));

const dbStocks = stocks.map(({ id, productId, count }) => ({
    PutRequest: {
        Item: {
            id: { S: id },
            productId: { S: productId },
            count: { N: count }
        }
    }
}));

AWS.config.update({ region: "eu-west-1" });
const DynamoDB = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const handler = function (err, data) {
    if (err) {
        console.log("Error on import", err)
    }
    else {
        console.log("Success import", data)
    }
};

DynamoDB.batchWriteItem({
    RequestItems: {
        products: [...dbProducts]
    }
}, handler);

DynamoDB.batchWriteItem({
    RequestItems: {
        stocks: [...dbStocks]
    }
}, handler);
