import { Router } from 'express';
import mongo from '../mongo';

const router = Router();

router.get('/', async function (req, res, next){
    console.log('hello', req.url)

    mongo.connect().then((result: any) => {
        console.log('mongodb connected :>>>', result)
        

        res.send("")
    })
})

export default router;
