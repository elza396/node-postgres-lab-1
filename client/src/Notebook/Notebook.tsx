import React, {useEffect, useState} from 'react'
import s from './Notebook.module.css'
import {IPerson} from '../../../common/models'
import {projectApi} from '../index'

export const Notebook = () => {
    const [persons, setPersons] = useState<IPerson[]>([])
    const [isAddPersonFormVisible, setIsAddPersonFormVisible] = useState<boolean>(false)

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

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const data = new FormData(e.target as HTMLFormElement)
            await projectApi.createPerson(data)
            await loadPersons()
            setIsAddPersonFormVisible(false)
        } catch (error) {
            alert('Error create person')
        }
    }

    return (
        <div className={s.contacts}>
            <p>Моя записная книжечка</p>
            {persons.map(item => (
                <div key={item.id} className={s.contact}>
                    <p>{item.name}</p>
                    <p>{item.surname}</p>
                    {item.birthday ? <p>{new Date(item.birthday).toLocaleDateString()}</p> : 'ㅤㅤㅤ-ㅤㅤㅤ'}
                    <div className={s.buttons}>
                        <button className={s.button}>...</button>
                        <button className={s.button} onClick={() => deleteHandler(item.id)}>
                            х
                        </button>
                    </div>
                </div>
            ))}
            {isAddPersonFormVisible ? (
                <form onSubmit={onSubmit} className={s.contact}>
                    <input className={s.input} required placeholder="Имя" type="text" name={'name'} />
                    <input className={s.input} placeholder="Фамилия" type="text" name={'surname'} />
                    <input className={s.input} placeholder="Дата рождения" type="date" name={'birthday'} />
                    <button>Save</button>
                </form>
            ) : (
                <button className={s.button} onClick={() => setIsAddPersonFormVisible(true)}>
                    Новый контакт
                </button>
            )}
        </div>
    )
}
