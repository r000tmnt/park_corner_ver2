import { Router } from 'express';
import mongo from '../mongo';
import formidable from 'formidable';
import fs from 'fs';

const router = Router();

const form = formidable({ multiples: true })

router.post('/add', async function (req, res, next){
    console.log('hello', req.body)

    await mongo.connect()
    const db = mongo.db('mongo_park_corner')
    const commission_type = db.collection('commission_type')

    form.parse(req, async(err, fields, files) => {
        if(!err){
            console.log('fileds :>>>', fields)
            // console.log('files :>>>', files)
            console.log('files :>>>', files[`files[0]`])

            let images: any = []

            for(let i=0; i < 5; i++){

                let currentImage: any = []

                if(files[`files[${i}]`] !== undefined){
                    let file:any = files[`files[${i}]`]
                    let readStream = fs.createReadStream(file.filepath, { highWaterMark: 16 })

                    readStream.on('data', (chunk) => {
                        // console.log('data :>>>', chunk)
                        currentImage.push(chunk)
                    })

                    readStream.on('end', async() => {
                        images.push(Buffer.concat(currentImage).toString('base64'))
                        // console.log(images)

                        if(i == 4){
                            fields['images'] = images
                            let insertResult = await commission_type.insertOne(fields)
                
                            console.log('insertResult :>>>', insertResult)
                        }
                    })
                }else{
                    console.log('undefiend', images.length)
                    fields['images'] = images
                    let insertResult = await commission_type.insertOne(fields)
        
                    console.log('insertResult :>>>', insertResult)
                }
            }

            // fields['images'] = images

            // let insertResult = await commission_type.insertOne(fields)

            // console.log('insertResult :>>>', insertResult)

        }else{
            console.log('form_parse_error :>>>', err)
        }
    })
})

export default router;