require('dotenv').config();
const axios = require('axios');
const allTaskURL = 'https://api.todoist.com/rest/v1/tasks?filter=today';

/* export our lambda function as named "handler" export */
exports.handler = async (event, context, callback) => {
  const response = await axios.get(allTaskURL, {
    headers: { Authorization: `Bearer ${process.env.TODOIST_TOKEN}` },
  });
  const tasks = await response.data;
  console.log(tasks);

  /* parse the string body into a useable JS object */
  // console.log('======================================================');
  // console.log(event);
  // console.log(context);
  // console.log('======================================================');

  return callback(null, {
    statusCode: 201,
    body: JSON.stringify(tasks),
  });
};
