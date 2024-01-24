import express, { Application } from 'express'
import * as Indexer from './service/indexer'
// import * as Console from '../truffle/console/console.js/index.js'
require('./db/db').setupDB()


const app = express()
const router = express.Router()

router.use(express.json())

router.post('/list', async (req, res) => {
    let { addrs } = req.query
    console.log(req.body);

    if (!addrs || !req.body?.length) return res.send('Invalid input')
    try {
        res.send(await Indexer.getAddressByQuery(addrs,req.body))
    } catch (error: any) {
        res.status(404).send(error.message)
    }
    // res.json(await Indexer.getAddressByQuery(''))
})

router.get('/transfer', async (req, res) => {
    // res.json(Console.TransferToken())
})

app.use(router)

app.listen(99, () => { console.log('SERVING ON 99') })