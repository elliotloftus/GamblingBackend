'use strict';
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
exports.saveWager = async function(event) {
  //TODO validate the event body
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body)
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      eid: data.eventId,
      id: timestamp,
      name: data.name,
      amount: data.amount,
      contestant: data.contestant,
      betType: data.betType,
      winnings: data.winnings
    }
  }
  // write the bet to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      const errorResponse = {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the bet item.',
      };
      return errorResponse
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    return response
  })
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
