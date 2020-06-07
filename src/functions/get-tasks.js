require('dotenv').config();
const axios = require('axios');
const allTaskURL = 'https://api.todoist.com/rest/v1/tasks?filter=today';

/* export our lambda function as named "handler" export */
exports.handler = async (event, context, callback) => {
  // Check that an authorization token was sent
  if (!event.headers.authorization) {
    return callback(null, {
      statusCode: 403,
      body: JSON.stringify('Missing authorization token'),
    });
  }
  const response = await axios.get(allTaskURL, {
    headers: { Authorization: `${event.headers.authorization}` },
  });
  const tasks = await response.data;
  
  return callback(null, {
    statusCode: 201,
    body: JSON.stringify(tasks),
  });
};
