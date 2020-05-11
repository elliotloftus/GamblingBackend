'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.getAllBets =  async function(event) {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
    };
    dynamoDb.get(params, (error, result) => {
        if (error) {
          console.error(error);
          const errorResponse = {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t fetch the item.',
          };
          return errorResponse
        }
    
        // create a response
        const response = {
          statusCode: 200,
          body: JSON.stringify(result.Items),
        };
        return response
      });
  };