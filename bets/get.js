'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.getAllBets =  (event, context, callback) =>  {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            eid: event.pathParameters.eventId,
        },
    };
    dynamoDb.get(params, (error, result) => {
        if (error) {
          console.error(error);
          callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t fetch the bets.',
          });
          return;
        }
    
        // create a response
        const response = {
          statusCode: 200,
          body: JSON.stringify(result.Items),
        };
        callback(null,response)
      });
  };