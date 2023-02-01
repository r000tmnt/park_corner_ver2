import express from 'express';
import test from '../route/test';
import commissionType from '../route/commission_type'

const app = express();

app.use(express.json());

app.use('/test', test)
app.use('/commission', commissionType)

module.exports = app

// export default function (req: any, res: any, next: any) {
//     // req is the Node.js http request object
//     console.log(req.url)
  
//     // res is the Node.js http response object
  
//     // next is a function to call to invoke the next middleware
//     // Don't forget to call next at the end if your middleware is not an endpoint!
//     next()
//   }