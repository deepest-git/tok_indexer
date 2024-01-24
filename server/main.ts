import express, { Application } from 'express'
import * as Indexer from './service/indexer'

const app = express()
const router = express.Router()

router.get('/test', async (req, res) => {
    res.json(await Indexer.getAddressByQuery(''))
})

app.use(router)

app.listen(99, () => { console.log('SERVING ON 99') })