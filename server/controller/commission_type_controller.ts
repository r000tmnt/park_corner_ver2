import mongo from '../mongo';
import formidable from 'formidable';
import fs from 'fs';
import sharp from 'sharp';

const form = formidable({ multiples: true })

export default {

    get_types: async(req: any, res: any, next: any) => {
        await mongo.connect()
        const db = mongo.db('mongo_park_corner')
        const commission_type = db.collection('commission_type')

        const types = await commission_type.find().toArray()

        // console.log(types)
        res.send(types) 
    },

    /**
     * 新增委託類型 
     */
    add_new_type: async(req: any, res: any, next: any) => {
        await mongo.connect()
        const db = mongo.db('mongo_park_corner')
        const commission_type = db.collection('commission_type')  
    
        form.parse(req, async(err, fields: any, files: any) => {
            if(!err){
                console.log('fileds :>>>', fields)
                console.log('files :>>>', files)

                let images = files['files[]']

                if(!Array.isArray(images)) images = [ { ...images } ]

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
                        console.log('resize :>>>', data)
                        fields.images.push(`data:${images[i].mimetype};base64,${Buffer.from(data).toString('base64')}`) 
                        
                        if(fields.images.length == images.length){
                            let insertResult = await commission_type.insertOne(fields)
                
                            console.log('insertResult :>>>', insertResult)
                            await mongo.close()
                            res.send('')
                        }
                    })
                }
    
            }else{
                console.log('form_parse_error :>>>', err)
                await mongo.close()
                res.send(err)
            }
        })        
    }
}