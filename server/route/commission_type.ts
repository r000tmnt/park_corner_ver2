import { Router } from 'express';
import mongo from '../mongo';
import formidable from 'formidable';

const router = Router();

router.post('/add', async function (req, res, next){
    console.log('hello', req.body)

    await mongo.connect()
    const db = mongo.db('mongo_park_corner')
    const commission_type = db.collection('commission_type')

    const form = formidable({ multiples: true })

    form.parse(req, (err, fields, files) => {
        if(!err){
            console.log('form_parse_error :>>>', err)
        }else{
            console.log('fileds :>>>', fields)
            console.log('files :>>>', files)
        }
    })

    let insertResult = commission_type.insertOne(req.body)

    console.log('insertResult :>>>', insertResult)
})

export default router;