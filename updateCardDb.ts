import fs from 'fs'
import mongoose from 'mongoose'
import Card from './models/card'
const JSONStream = require('JSONStream')

mongoose.connect('mongodb://localhost:27017')
  .then(async () => {
    try {
      console.log('Connected to MongoDB')
      await Card.deleteMany({})
      const stream = fs.createReadStream('./.carddata/all-cards-20240214101438.json')
      await new Promise ((resolve, reject) => {
        stream.pipe(JSONStream.parse('*') as any)
        .on('data', (data: any) => {
          const dbCard = new Card({
            name: data.name,
            set: {
              name: data['set_name'],
              code: data.set,
              scid: data['set_id']
            },
            uri: data.uri,
            manaCost: data['mana_cost'],
            cmc: data.cmc,
            colors: data.colors,
            colorIdentity: data.color_identity,
            image: data['image_uris'],
            lang: data.lang,
            _id: data.id,
            prices: {
              usd: data.prices['usd'],
              usd_foil: data.prices['usd_foil'],
              usd_etched: data.prices['usd_etched'],
            },
            legalities: {...data.legalities},
            oracleText: data['oracle_text']
          })
          dbCard.save()
            .then((data: any) => {
              console.log(`${data.name} loaded`)
            })
            .catch((err: any) => console.log(err))
        })
        .on('end', () => resolve(null))
        .on('error', (err: any) => {
          reject(err)
        })
      })
    } catch (error) {
      console.log(error)
    } finally {
      mongoose.disconnect()
    }
  })
