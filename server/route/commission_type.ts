import { Router } from 'express';
import mongo from '../mongo';
import formidable from 'formidable';
import fs from 'fs';
import sharp from 'sharp';

const router = Router();

const form = formidable({ multiples: true })

router.post('/add', async function (req, res, next){
    console.log('hello', req.body)

    await mongo.connect()
    const db = mongo.db('mongo_park_corner')
    const commission_type = db.collection('commission_type')  

    form.parse(req, async(err, fields: any, files: any) => {
        if(!err){
            console.log('fileds :>>>', fields)
            // console.log('files :>>>', files)
            console.log('files :>>>', files)

            let images: any = files['files[]']

            fields = {
                ...fields,
                acceptable: Number(fields.acceptable),
                price: Number(fields.price),
                variations: JSON.parse(fields.variations),
                images: []
            }

            for(let i=0; i < fields.variations.length; i++){
                fields.variations[i].price = Number(fields.variations[i].price)
            }

            for(let i=0; i < images.length; i++){


                let file = await fs.promises.readFile(images[i].filepath)

                sharp(file).resize(500, 500, {
                    fit: 'outside'
                }).toBuffer()
                .then(async(data) => {
                    fields.images.push(`data:${images[i].mimetype};base64,${Buffer.from(data).toString('base64')}`) 
                    
                    if(fields.images.length == images.length){
                        let insertResult = await commission_type.insertOne(fields)
            
                        console.log('insertResult :>>>', insertResult)
                    }
                })
            }

        }else{
            console.log('form_parse_error :>>>', err)
        }
    })
})

export default router;