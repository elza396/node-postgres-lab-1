import React, {useEffect, useState} from 'react'
import s from './Contacts.module.css'
import {IContact} from '../../../common/models'
import {projectApi} from '../index'

interface IProps {
    id: number
}

export const Contacts = (props: IProps) => {
    const [contacts, setContacts] = useState<IContact[]>([])
    const [isAddContactFormVisible, setIsAddContactFormVisible] = useState<boolean>(false)

    const getContacts = async () => {
        try {
            const newContacts = await projectApi.getContactsById(props.id)
            setContacts(newContacts)
        } catch (error) {
            alert('Error load contact')
        }
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const data = new FormData(e.target as HTMLFormElement)
            await projectApi.createContact(data)
            await getContacts()
            setIsAddContactFormVisible(false)
        } catch (error) {
            alert('Error create contact')
        }
    }

    useEffect(() => {
        void getContacts()
    }, [])

    return (
        <div className={s.contacts}>
            {contacts.length < 1 ? (
                <div className={s.contact}>Нет данных</div>
            ) : (
                contacts.map(contact => (
                    <>
                        <div className={s.contact}>
                            <p>{contact.name}</p>
                            <p>{contact.value}</p>
                            <div className={s.buttons}>
                                <button className={s.button}>...</button>
                            </div>
                        </div>
                    </>
                ))
            )}

            {isAddContactFormVisible ? (
                <form onSubmit={onSubmit} className={s.contact}>
                    <input hidden name={'personId'} value={props.id} />
                    <input className={s.input} required placeholder="Type" name={'contacttypeId'} />
                    <input className={s.input} placeholder="Value" name={'value'} />
                    <button>Save</button>
                </form>
            ) : (
                <button className={s.button} onClick={() => setIsAddContactFormVisible(true)}>
                    Add contact
                </button>
            )}
        </div>
    )
}
