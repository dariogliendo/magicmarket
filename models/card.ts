import mongoose from 'mongoose'

type LegalityType = 'legal' | 'not_legal' | 'banned' | 'restricted'

const magicColors = ['W', 'U', 'B', 'R', 'G', 'C']
const legalities: LegalityType[] = ['legal', 'not_legal', 'banned', 'restricted']

export type Card = {
  _id: string,
  name: string,
  set: {
    name: string,
    code: string,
    scid: string
  },
  uri: string,
  manaCost: string,
  colors: string[],
  colorIdentity: string[],
  cmc: number,
  image: {
    small: string,
    normal: string,
    large: string,
    png: string,
    art_crop: string,
    border_crop: string,
  },
  oracleText: string,
  printedText: string,
  legalities: {
    standard: LegalityType,
    future: LegalityType,
    historic: LegalityType,
    gladiator: LegalityType,
    pioneer: LegalityType,
    modern: LegalityType,
    legacy: LegalityType,
    pauper: LegalityType,
    vintage: LegalityType,
    penny: LegalityType,
    commander: LegalityType,
    brawl: LegalityType,
    historicbrawl: LegalityType,
    alchemy: LegalityType,
    paupercommander: LegalityType,
    duel: LegalityType,
    oldschool: LegalityType,
    premodern: LegalityType
  }
  prices: {
    usd: string,
    usd_foil: string,
    usd_etched: string,
  },
  lang: string
}

const cardSchema = new mongoose.Schema<Card>({
  _id: String,
  name: {
    type: String,
    index: true,
  },
  set: {
    name: String,
    code: String,
    scid: String
  },
  uri: String,
  manaCost: String,
  colors: [{
    type: String,
    enum: magicColors
  }],
  colorIdentity: [{
    type: String,
    enum: magicColors
  }],
  cmc: Number,
  image: {
    small: String,
    normal: String,
    large: String,
    png: String,
    art_crop: String,
    border_crop: String,
  },
  oracleText: String,
  legalities: {
    standard: {
      type: String,
      enum: legalities
    },
    future: {
      type: String,
      enum: legalities
    },
    historic: {
      type: String,
      enum: legalities
    },
    gladiator: {
      type: String,
      enum: legalities
    },
    pioneer: {
      type: String,
      enum: legalities
    },
    modern: {
      type: String,
      enum: legalities
    },
    legacy: {
      type: String,
      enum: legalities
    },
    pauper: {
      type: String,
      enum: legalities
    },
    vintage: {
      type: String,
      enum: legalities
    },
    penny: {
      type: String,
      enum: legalities
    },
    commander: {
      type: String,
      enum: legalities
    },
    brawl: {
      type: String,
      enum: legalities
    },
    historicbrawl: {
      type: String,
      enum: legalities
    },
    alchemy: {
      type: String,
      enum: legalities
    },
    paupercommander: {
      type: String,
      enum: legalities
    },
    duel: {
      type: String,
      enum: legalities
    },
    oldschool: {
      type: String,
      enum: legalities
    },
    premodern: {
      type: String,
      enum: legalities
    }
  },
  prices: {
    usd: String,
    usd_foil: String,
    usd_etched: String,
  },
  lang: {
    type: String,
    enum: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'ru', 'zhs', 'zht', 'he', 'la', 'grc', 'ar', 'sa', 'ph']
  }
})

cardSchema.index({
  oracleText: 'text',
  name: 'text'
}, {
  weights: {
    oracleText: 1,
    name: 2
  }
})

const model = mongoose.model('Card', cardSchema)

export default model