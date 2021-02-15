import { v4 as uuidv4 } from 'uuid';

var formatError = function(message, errorCode) {
  const uuid = uuidv4();
  const timestamp = Date();

  console.log(` 
=== ERROR CODE < ${errorCode} > : UUID [ ${uuid} ] : timestamp ${timestamp} ===
${message}
================================
`);
  return {uuid, timestamp};
};

const logger = {
  error: (message, errorCode) => formatError(message, errorCode),
};

export default logger;