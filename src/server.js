import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { PrismaClient } from '@prisma/client';
const { json } = require('body-parser');


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const prisma = new PrismaClient();

export default polka() // You can also use Express
  .use((req, res, next) => {
    req["prisma"] = prisma;
    next();
  })
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
    json(),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
