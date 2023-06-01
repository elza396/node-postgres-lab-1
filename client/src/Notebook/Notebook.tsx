import React, {useEffect, useState} from 'react'
import s from './Notebook.module.css'
import {IPersons} from '../models'
import {projectApi} from '../index'

export const Notebook = () => {
    const [persons, setPersons] = useState<IPersons[]>([])

    const loadPersons = async () => {
        try {
            const persons = await projectApi.getPersons()
            setPersons(persons)
        } catch (error) {
            alert('Error load persons')
        }
    }

    useEffect(() => {
        void loadPersons()
    }, [])

    const deleteHandler = async (id: number) => {
        try {
            await projectApi.deletePerson(id)
            await loadPersons()
        } catch (error) {
            alert('Error delete person')
        }
    }

    return (
        <div className={s.contacts}>
            <p>Моя записная книжечка</p>
            {persons.map(item => (
                <div key={item.id} className={s.contact}>
                    <p>{item.name}</p>
                    <p>{item.surname}</p>
                    <p>{new Date(item.birthday).toLocaleDateString()}</p>
                    <div className={s.buttons}>
                        <button className={s.button}>...</button>
                        <button className={s.button} onClick={() => deleteHandler(item.id)}>
                            х
                        </button>
                    </div>
                </div>
            ))}
            <button className={s.button}>Добавить контакт</button>
        </div>
    )
}
