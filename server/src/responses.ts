import {Pool as Client} from 'pg'

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'notebook',
    password: '119913',
    port: 5432
})

export const getContacts = () => {
    return new Promise(function (resolve, reject) {
        client.query('SELECT * FROM Contacts, Persons', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows)
        })
    })
}
export const getPersons = () => {
    return new Promise(function (resolve, reject) {
        client.query('SELECT * FROM Persons', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows)
        })
    })
}
export const deletePerson = (id: number) => {
    return new Promise(function (resolve, reject) {
        client.query(`DELETE FROM Persons WHERE ID=${id}`, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows)
        })
    })
}
