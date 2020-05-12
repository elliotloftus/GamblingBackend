'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.getAllBets =  (event, context, callback) =>  {
    const eventId = event.pathParameters.eventId
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        KeyConditionExpression: "#eventIdName = :eventIdValue",
        ExpressionAttributeNames: {
          "#eventIdName":"eid"
        },
        ExpressionAttributeValues: {
          ":eventIdValue": eventId
        }
    };
    dynamoDb.query(params, (error, result) => {
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
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(result.Items),
        };
        callback(null,response)
      });
  };