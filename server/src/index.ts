import express, {Express} from 'express'
import dotenv from 'dotenv'
import {
    createContact,
    createContactType,
    createPerson,
    deleteContact,
    deleteContactType,
    deletePerson,
    getContactsById,
    getContactTypes,
    getPersons
} from './responses'
import bodyParser from 'body-parser'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers')
    next()
})
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.raw())

app.get('/', (req, res) => {
    getPersons()
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

app.delete('/', (req, res) => {
    deletePerson(req.body.id)
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

app.post('/', (req, res) => {
    createPerson(req.body)
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

app.post('/contacts', (req, res) => {
    getContactsById(req.body.id)
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})
app.post('/contact', (req, res) => {
    createContact(req.body)
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

app.delete('/contact', (req, res) => {
    deleteContact(req.body.id)
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

app.get('/contactTypes', (req, res) => {
    getContactTypes()
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

app.delete('/contactType', (req, res) => {
    deleteContactType(req.body.id)
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

app.post('/contactType', (req, res) => {
    createContactType(req.body)
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
