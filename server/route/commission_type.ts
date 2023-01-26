import { Router } from 'express';
import mongo from '../mongo';

const router = Router();

router.get('/add', async function (req, res, next){
    console.log('hello', req.body)

    await mongo.connect()
    const db = mongo.db('mongo_park_corner')
    const commission_type = db.collection('commission_type')

    commission_type.insertOne(req.body, )
})

export default router;