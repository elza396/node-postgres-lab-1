import React, {useEffect, useState} from 'react'
import s from './Notebook.module.css'
import {IPerson} from '../../../common/models'
import {projectApi} from '../index'
import {Contacts} from '../Contacts/Contacts'

export const Notebook = () => {
    const [persons, setPersons] = useState<IPerson[]>([])
    const [isAddPersonFormVisible, setIsAddPersonFormVisible] = useState<boolean>(false)
    const [visiblePersonId, setVisiblePersonId] = useState<number | null>(null)

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
            console.log(error)
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

    const personToggle = async (id: number) => {
        if (visiblePersonId === id) {
            setVisiblePersonId(null)
        } else {
            setVisiblePersonId(id)
        }
    }

    return (
        <div className={s.persons}>
            <p>My notebook</p>
            {persons.map(item => (
                <div key={item.id} className={s.personWrapper}>
                    <div className={s.person} onClick={() => personToggle(item.id)}>
                        <p>{item.name}</p>
                        <p>{item.surname}</p>
                        {item.birthday ? <p>{new Date(item.birthday).toLocaleDateString()}</p> : 'ㅤㅤㅤ-ㅤㅤㅤ'}
                        <div className={s.buttons}>
                            <button className={s.button} onClick={() => deleteHandler(item.id)}>
                                х
                            </button>
                        </div>
                    </div>
                    {visiblePersonId === item.id && <Contacts id={item.id} />}
                </div>
            ))}
            {isAddPersonFormVisible ? (
                <form onSubmit={onSubmit} className={s.person}>
                    <input className={s.input} required placeholder="Name" type="text" name={'name'} />
                    <input className={s.input} placeholder="Surname" type="text" name={'surname'} />
                    <input className={s.input} placeholder="Date of birth" type="date" name={'birthday'} />
                    <button>Save</button>
                </form>
            ) : (
                <button className={s.button} onClick={() => setIsAddPersonFormVisible(true)}>
                    Add person
                </button>
            )}
        </div>
    )
}
