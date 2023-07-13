import {Pool as Client} from 'pg'
import {IContact, IContactType, IPerson} from '../../common/models'

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'notebook',
    password: '119913',
    port: 5432
})

const getKeysAndValues = (arrayOfObj: any) => {
    const keys: string[] = []
    const values: string[] = []
    Array.from(Object.entries(arrayOfObj))
        .filter(([_, value]) => value && value.length > 0)
        .forEach(([key, value]) => {
            keys.push(`"${key}"`)
            values.push(`'${value}'`)
        })
    return [keys, values]
}

export const getContactsById = (id: number) => {
    return new Promise(function (resolve, reject) {
        client.query(
            `SELECT c.id, c.value, ct.name FROM contacts c LEFT JOIN contacttypes ct ON c."contacttypeId" = ct."id" WHERE c."personId" = ${id}`,
            (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows)
            }
        )
    })
}

const buildCreateContactQuery = (contact: Partial<IContact>) => {
    const [keys, values] = getKeysAndValues(contact)

    return `INSERT INTO contacts(${keys.join(',')}) VALUES (${values.join(',')})`
}

export const createContact = (contact: Partial<IContact>) => {
    return new Promise(function (resolve, reject) {
        client.query(buildCreateContactQuery(contact), (error, results) => {
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
        client.query(`DELETE FROM Contacts WHERE Contacts."personId"=${id}; DELETE FROM Persons WHERE ID=${id}`, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows)
        })
    })
}

const buildCreatePersonQuery = (person: Partial<IPerson>) => {
    const [keys, values] = getKeysAndValues(person)

    return `INSERT INTO persons(${keys.join(',')}) VALUES (${values.join(',')}) RETURNING *`
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

export const deleteContact = (id: number) => {
    return new Promise(function (resolve, reject) {
        client.query(`DELETE FROM Contacts WHERE ID=${id}`, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows)
        })
    })
}

export const getContactTypes = () => {
    return new Promise(function (resolve, reject) {
        client.query('SELECT *, EXISTS(SELECT id FROM Contacts c WHERE c."contacttypeId" = ct.id) FROM contactTypes ct', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows)
        })
    })
}

export const deleteContactType = (id: number) => {
    return new Promise(function (resolve, reject) {
        client.query(`DELETE FROM ContactTypes WHERE ID=${id}`, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows)
        })
    })
}

const buildCreateContentTypeQuery = (type: Partial<IContactType>) => {
    const [keys, values] = getKeysAndValues(type)

    return `INSERT INTO ContactTypes(${keys.join(',')}) VALUES (${values.join(',')}) RETURNING *`
}

export const createContactType = (type: Partial<IContactType>) => {
    return new Promise(function (resolve, reject) {
        client.query(buildCreateContentTypeQuery(type), (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows)
        })
    })
}
