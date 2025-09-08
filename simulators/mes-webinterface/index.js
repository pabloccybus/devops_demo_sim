const express = require('express')
const bodyParser = require('body-parser')
const mariadb = require('mariadb')

const app = express()
const port = 3000

const pool = mariadb.createPool({ host: 'mes', user: 'root', password: 'cybus', database: 'cybus', connectionLimit: 5 })

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.post('/', async (req, res) => {
    console.log(req.body)

    if (typeof req.body?.order === undefined) {
        res.status(500).send('Something broke!')
        return
    }

    if (typeof req.body?.order !== 'string') {
        res.status(500).send('Order is not a string!')
        return
    }

    let conn = null
    try {
        conn = await pool.getConnection()
        const res = await conn.query(`INSERT INTO \`order\` (number) VALUES ('${req.body?.order}')`)
    } catch (e) {
        res.status(500).send(e.message)
        return
    } finally {
        if (conn) conn.release() //release to pool
    }

    res.status(200).redirect('back')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})