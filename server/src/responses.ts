import {Pool as Client} from 'pg'
import {IPerson} from '../../common/models'

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

const buildCreatePersonQuery = (person: Partial<IPerson>) => {
    const keys: string[] = []
    const values: string[] = []
    Array.from(Object.entries(person))
        .filter(([_, value]) => value && value.length > 0)
        .forEach(([key, value]) => {
            keys.push(key)
            values.push(`'${value}'`)
        })

    return `INSERT INTO persons(${keys.join(',')}) VALUES (${values.join(',')})`
}

export const createPerson = (person: Partial<IPerson>) => {
    return new Promise(function (resolve, reject) {
        client.query(buildCreatePersonQuery(person), (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows)
        })
    })
}
