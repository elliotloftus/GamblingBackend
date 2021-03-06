'use strict';
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
exports.saveWager = (event, context, callback) => { 
  //TODO validate the event body
  console.log("request entered for " + JSON.stringify(event))
  const timestamp = new Date().getTime()
  const data = JSON.parse(event.body)
  console.log("data " + JSON.stringify(data))
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      eid: data.eventId,
      id: timestamp.toString(),
      name: data.name,
      amount: data.amount,
      contestant: data.contestant,
      betType: data.betType,
      winnings: data.winnings
    },
  };
  console.log("putting params " + JSON.stringify(params))
  // write the bet to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the bet item.',
      });
      return;
    }
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(params.Item),
    };
    callback(null,response)
  });
};
