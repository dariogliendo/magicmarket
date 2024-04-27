import Card from '../models/card'
import { Request, Response, Router } from 'express'



const cardsRouter : Router = Router()

type ColorName =  'W' | 'U' | 'B' | 'R' | 'G' | 'C' 
const allColors = ['W', 'U', 'B', 'R', 'G']

cardsRouter.get('/', async (req: Request, res: Response) => {
  if (!req.query.pageSize) req.query.pageSize = '60'
  if (!req.query.page) req.query.page = '1'

  const filter : any = {}

  if (req.query.search) {
    const result = await Card.find({
      lang: 'en',
      $text: {$search: req.query.search as string} },
      { score : { $meta: "textScore" } },
    ).limit(Number(req.query.pageSize || 50)).skip(Number(req.query.page) * Number(req.query.pageSize)).sort({ score: { $meta: "textScore" } }).exec()
    const responseObject = {
      totalCards: await Card.countDocuments(filter),
      pageSize: req.query.pageSize,
      page: req.query.page,
      totalPages: Math.ceil(await Card.countDocuments() / Number(req.query.pageSize)),
      nextPage: req.protocol + '://' + req.get('host') + req.baseUrl + '?pageSize=' + req.body.pageSize + '&page=' + (Math.floor(req.body.page) + 1),
      cards: result
    }
    return res.send(responseObject)
  }

  if (req.query.name) filter['name'] = {$regex: req.query.name || '', $options: 'i'}
  if (req.query.colors) {
    if (req.query.colors.length === 1 && (req.query.colors as ColorName[])[0] === 'C') filter.colorIdentity = {$size: 0}
    else {
      const baseFilter = {$elemMatch: {$all: (req.query.colors as ColorName[]), $ne: allColors.filter((f : any) => !(req.query.colors as ColorName[]).includes(f))}}
      if ((req.query.colors as ColorName[]).includes('C')) filter.$or = [{colorIdentity: baseFilter}, {colorIdentity: {$size: 0}}]
      else filter.colorIdentity = baseFilter
    }
  }

  filter.lang = 'en'
  

  const cards = await Card.find(filter).skip(Number(req.query.pageSize) * (Number(req.query.page) - 1)).limit(Number(req.query.pageSize))
  const responseObject = {
    totalCards: await Card.countDocuments(filter),
    pageSize: req.query.pageSize,
    page: req.query.page,
    totalPages: Math.ceil(await Card.countDocuments() / Number(req.query.pageSize)),
    nextPage: req.protocol + '://' + req.get('host') + req.baseUrl + '?pageSize=' + req.body.pageSize + '&page=' + (Math.floor(req.body.page) + 1),
    cards
  }
  res.send(responseObject)
})

export default cardsRouter