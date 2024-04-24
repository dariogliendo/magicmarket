const axios = require('axios')
const bfj = require('bfj')

const downloadBulk = async () => {
  const { data } = await axios.get('https://api.scryfall.com/bulk-data')
  return data
}

const updateCards = async () => {
  try {
    const { data: response } = await downloadBulk()
    const allCardsObject = response.find(f => f.name === 'All Cards')
    const { data: file } = await axios.get(allCardsObject.download_uri, {
      responseType: 'stream',
      onDownloadProgress: progressEvent => {
        const percent = (progressEvent.loaded * 100) / allCardsObject.size
        console.log(`[${Array.from({ length: 20 }).map((_, i) => (i < percent / 5 ? '█' : '#')).join('')}] ${percent.toFixed(2)}% - ${progressEvent.rate / 1000}KB/s`)
      }
    })
    const data = await bfj.parse(file)
    console.log(data)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  updateCards
}
