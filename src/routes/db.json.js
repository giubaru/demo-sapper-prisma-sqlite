import { insert } from "svelte/internal";
// var logger = require('../logger');
import logger  from '../logger';

export async function get(req, res) {
  const categories = await req.prisma.category.findMany();
  
  res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(categories));
}

export async function post(req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  var data = req.body;
  var response_status = '';
  var response = false;
  

  if (data.title === '') {
    const errorCode = 'empty-field';

    const {uuid, timestamp} = logger.error('You must not insert empty values...', errorCode);
    response_status = {message: errorCode, uuid, timestamp};
    return res.end(JSON.stringify({ status: response_status}))
    // throw 'You must not insert empty values...';

  }

  try {

    const insert = await req.prisma.category.create(
      {
        data: {
          title: data.title
        }
      }
    );
    response_status = {message: 'success', uuid: false};
    response = insert;
  
  } catch (error) {
    const errorCode = 'insert-error';

    const {uuid, timestamp} = logger.error(error, errorCode);
    response_status = {message: errorCode, uuid, timestamp};
  }
  
  const categories = await req.prisma.category.findMany();

  return res.end(JSON.stringify({ status: response_status, data: categories}))
  
}